import { Paper } from "@mui/material";
import React from "react";
import DeviceCard from "../components/deviceCard.component";
import DeviceDialog from "../components/deviceDialog.component";
import Layout from "../components/layout.component";
import UserCard from "../components/userCard.component";
import UserDialog from "../components/userDialog.component";
import Device from "../dtos/device.dto";
import User from "../dtos/user.dto";
import { getAllDevices } from "../services/device.service";
import { getAllUsers } from "../services/user.service";

//each card will be clickable
// device -> create/delete/alter device, location, consumption, only show who its assigned to 
// user ->(create is by signup) delete/alter email, show devices in carousel, has add button that brings up available device popup, same size as og window

const AdministrationPage = () => {
    let [selectedDevice, setSelectedDevice] = React.useState({} as Device);
    let [devices, setDevices] = React.useState([] as Device[]);


    let [selectedUser, setSelectedUser] = React.useState({} as User);
    let [users, setUsers] = React.useState([] as User[]);


    React.useEffect(() => {
        const getData = async () => {
            const devices = await getAllDevices();
            const users = await getAllUsers();
            setUsers(users);
            setDevices(devices);
        }
        getData();
    }, []);


    return (
        <Layout>
            <h1>Administration</h1>
            <p>Devices</p>

            <div style={{ display: "flex", flexDirection: "row", overflow: "scroll", maxWidth: "98vw", minHeight: "220px", padding: "5px" }}>
                <div style={{ paddingRight: "15px" }} onClick={() =>{setSelectedDevice({id:-1} as Device)}}>
                    <Paper elevation={4} >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "200px", width: "200px" }}>
                            <h1>Create Device</h1>
                        </div>
                    </Paper>
                </div>

                {devices.map((device: Device) => {
                    return (
                        <DeviceCard device={device} setSelectedDevice={setSelectedDevice} />
                    );
                })}
            </div>

            <div>
                {selectedDevice.id ? <DeviceDialog setSelectedDevice={setSelectedDevice} device={selectedDevice} /> : ""}
                {/* {selectedDevice.id?<UserDialog/>:""} */}
            </div>

            <p>Users</p>
            <div style={{ display: "flex", flexDirection: "row", overflow: "scroll", minHeight: "220px", maxWidth: "98vw", padding: "5px" }}>
                {users.map((user: User) => {
                    return (
                        <UserCard user={user} setSelectedUser={setSelectedUser} />
                    );
                })}
            </div>

            <div>

                {selectedUser.id ? <UserDialog setSelectedUser={setSelectedUser} user={selectedUser} /> : ""}
                {/* {selectedDevice.id?<UserDialog/>:""} */}
            </div>

        </Layout>
    );
}

export default AdministrationPage;