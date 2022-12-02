import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Device from '../dtos/device.dto';
import { useEffect, useState } from 'react';
import { createDevice, deleteDevice, getDevice, updateDevice } from '../services/device.service';
import { create } from 'domain';


interface Props {
    setSelectedDevice: React.Dispatch<React.SetStateAction<Device>>,
    device: Device,
}

interface state {
    formData: {
        address: string,
        maximumHourlyConsumption: number,
        description: string,
    },
    submitted: boolean,
    opened: boolean,
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeviceDialog = (props: Props) => 
{
    const [formData, setFormData] = useState<state>(
        {
            formData: {
                address: props.device.address,
                maximumHourlyConsumption: -0,
                description: props.device.description,
            },
            submitted: false,
            opened: true,
        }
    );

    useEffect(() => {
        const fetchData = async () => {
             getDevice(props.device.id).then((device: Device) => {
                console.log(device);
                setFormData({
                    formData: {
                        address: device.address,
                        maximumHourlyConsumption: device.maximumHourlyConsumption,
                        description: device.description,
                    },
                    submitted: false,
                    opened: true,
                });
                //console.log(device);
            });
        } 
        fetchData();
    }, []);


    const handleChange = (event: any) => {
        const index1: 'address' = event.target.name;
        const index2: 'description' = event.target.name;
        const index3: 'maximumHourlyConsumption' = event.target.name;

        formData.formData[index1] = event.target.value;
        formData.formData[index2] = event.target.value;
        formData.formData[index3] = event.target.value;

        setFormData({ ...formData, formData: formData.formData });
    }

    const handleDelete= async () => {
        const rez = await deleteDevice({...formData.formData, id: props.device.id} as Device);
        if(rez == 200){
            alert("Device deleted!");
            props.setSelectedDevice({} as Device);
            setFormData({ ...formData, opened: false });
        }
        
    }

    const handleClose = () => {
        props.setSelectedDevice({} as Device);
        setFormData({ ...formData, opened: false });
    };

    const handleSubmit = async () => {
        setFormData({ ...formData, submitted: true });
        let rez;
        if(props.device.id === -1){
            rez = await createDevice({id : 0 ,address:formData.formData.address, maximumHourlyConsumption: formData.formData.maximumHourlyConsumption, description: formData.formData.description});
        }else{
            rez = await updateDevice({...props.device, address:formData.formData.address, maximumHourlyConsumption: formData.formData.maximumHourlyConsumption, description: formData.formData.description});
        }

        if (rez.id) {
            alert("Device updated!");
        } else {
            alert("Something went wrong!");
        }
        setFormData({ ...formData, submitted: false });
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
                <DialogTitle>{"Configure the selected device"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Here you can alter the selected device.
                    </DialogContentText>

                    <ValidatorForm
                        onSubmit={handleSubmit}
                        style={{ paddingTop: "20px" }}
                    >
                        <TextValidator
                            label="address"
                            onChange={handleChange}
                            name="address"
                            value={formData.formData.address}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                         
                          <TextValidator
                            label="maximumHourlyConsumption"
                            onChange={handleChange}
                            name="maximumHourlyConsumption"
                            value={formData.formData.maximumHourlyConsumption}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />   

                        <TextValidator
                            label="description"
                            onChange={handleChange}
                            name="description"
                            value={formData.formData.description}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

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
                            Delete Device
                        </Button>

                    </ValidatorForm>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default DeviceDialog;