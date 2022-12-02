import React from "react";
import DeviceCarousel from "../components/deviceCarousel.component";
import DeviceView from "../components/deviceView.component";
import Layout from "../components/layout.component";
import Device from "../dtos/device.dto";
import { getUserDevices } from "../services/device.service";
import { getLoggedInUser } from "../services/user.service";

const getDevices= async () => {
    const user = getLoggedInUser();
    const devices = await getUserDevices(user).then((response) => {
        return response;
    });
    return devices;
}

const HomePage = () => {

    const user = getLoggedInUser();
    let [devices, setDevices] = React.useState([] as Device[]);
    React.useEffect(() => {
        getDevices().then((devices) => {
            setDevices(devices);
        });
    }, []);

    const [selectedDevice, setSelectedDevice] = React.useState({} as Device);

    return (
        <Layout>
            <div>
                <h1>Welcome {user.email}</h1>
                <br></br>
            </div>

            <div style={{paddingLeft:"0px"}}>
                <DeviceCarousel devices={devices} setSelectedDevice={setSelectedDevice}/>
            </div>

            <div>
                <DeviceView device={selectedDevice}/>
            </div>
        </Layout>
    );
}

export default HomePage;