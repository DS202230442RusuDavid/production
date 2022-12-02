import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import User from '../dtos/user.dto';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Role from '../dtos/role.dto';
import { Checkbox, FormControlLabel, Paper } from '@mui/material';
import { deleteUser, updateUser } from '../services/user.service';
import Device from '../dtos/device.dto';
import { getAllDevices, getUserDevices as sGetUserDevices, updateDevice } from '../services/device.service';
import { useEffect, useState } from 'react';


interface Props {
    setSelectedUser: React.Dispatch<React.SetStateAction<User>>,
    user: User,
}

interface state {
    formData: {
        email: string,
        admin: boolean,
    },
    submitted: boolean,
    opened: boolean,
    devices: Device[],
    allDevices: Device[],
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserDialog = (props: Props) => {
    const [formData, setFormData] = useState<state>(
        {
            formData: {
                email: props.user.email,
                admin: props.user.role === Role.Admin,
            },
            submitted: false,
            opened: true,
            devices: [],
            allDevices: [],
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            const devices = await sGetUserDevices(props.user);
            const allDevices = await getAllDevices();
            setFormData({ ...formData, devices, allDevices });
        }

        fetchData();
    }, []);


    const handleChange = (event: any) => {
        const index: 'email' = event.target.name;
        formData.formData[index] = event.target.value;
        setFormData({ ...formData, formData: formData.formData });
    }

    const handleDelete = async () => {
        const rez = await deleteUser(props.user);
        if(rez == 200) {
            props.setSelectedUser({} as User);
            setFormData({ ...formData, opened: false });
            alert("User deleted");
        }else{
            alert('Error');
        }
    }

    const handleClose = () => {
        props.setSelectedUser({} as User);
        setFormData({ ...formData, opened: false });
    };

    const handleSubmit = async () => {
        setFormData({ ...formData, submitted: true });
        const rez = await updateUser({ ...props.user, email: formData.formData.email, role: formData.formData.admin ? Role.Admin : Role.User });
        if (rez.id) {
            alert("User updated!");
        } else {
            alert("Something went wrong!");
        }
        setFormData({ ...formData, submitted: false });
    }

    const handleDeviceAssign = async (device: Device) => { 
        const rez = await updateDevice({ ...device}, props.user);
        if (rez.id) {
            //alert("Device assigned!");
            //remove from all devices and add it to user devices
            const allDevices = formData.allDevices.filter((d: Device) => d.id !== device.id);
            const devices = [...formData.devices, device];
            setFormData({ ...formData, allDevices, devices });
        } else {
            alert("Something went wrong!");
        }
    }

    const handleDeviceUnassign = async (device: Device) => {
        const rez = await updateDevice(device, { ...props.user, id: null } as User)
        if (rez.address) {
           //alert("Device unassigned!");
            //remove device from list
            const index = formData.devices.indexOf(device);
            if (index > -1) {
                formData.devices.splice(index, 1);
            }
            setFormData({ ...formData, devices: formData.devices });

        } else {
            alert("Something went wrong!");
        }
    }

    return (
        <div>
            <Dialog
                open={formData.opened}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Configure the selected user"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Here you can alter the selected user's email and role. And edit his/hers linked devices.
                    </DialogContentText>

                    <ValidatorForm
                        onSubmit={handleSubmit}
                        style={{ paddingTop: "20px" }}
                    >
                        <TextValidator
                            label="Email"
                            onChange={handleChange}
                            name="email"
                            value={formData.formData.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />

                        <FormControlLabel control={<Checkbox defaultChecked={formData.formData.admin} />} label="Admin" onChange={() => { setFormData({ ...formData, formData: { admin: !formData.formData.admin, email: formData.formData.email } }) }} />

                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={formData.submitted}
                        >
                            Submit
                        </Button>
                        
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleDelete}
                        >
                            Delete User
                        </Button>

                    </ValidatorForm>
                    {/* TODO: Make this a component */}
                    {/* USER DEVICES */}
                    <div>
                        <div style={{ display: "flex", flexDirection: "row", overflow: "scroll", maxWidth: "98vw", padding: "5px" }}>
                            {formData.devices.map((device: Device) => {
                                return (
                                    <div style={{ paddingRight: "15px" }} onClick={() => handleDeviceUnassign(device)}>
                                        <Paper elevation={4} >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "200px", width: "200px" }}>
                                                <h1>{device.maximumHourlyConsumption}</h1>
                                                <h2>{device.description}</h2>
                                                <h3>{device.address}</h3>
                                            </div>
                                        </Paper>
                                    </div>
                                );
                            })}
                        </div>
                        {/* ALL DEVICES */}
                        <div style={{ display: "flex", flexDirection: "row", overflow: "scroll", maxWidth: "98vw", padding: "5px" }}>
                            {formData.allDevices.filter((device : Device) => { 
                                //filter out devices that are already assigned to the user
                                return !formData.devices.some((d: Device) => d.id === device.id);
                            }).map((device: Device) => {
                                return (
                                    <div style={{ paddingRight: "15px" }} onClick={() => handleDeviceAssign(device)}>
                                        <Paper elevation={4} >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "200px", width: "200px" }}>
                                                <h1>{device.maximumHourlyConsumption}</h1>
                                                <h2>{device.description}</h2>
                                                <h3>{device.address}</h3>
                                            </div>
                                        </Paper>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UserDialog;