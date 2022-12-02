import React from "react";
import { Paper } from "@mui/material";
import Device from "../dtos/device.dto";

interface Props {
    device: Device,
    setSelectedDevice: React.Dispatch<React.SetStateAction<Device>>,
}


const DeviceCard = ({ device, setSelectedDevice }: Props) => {

    const selectedCard = () => {
        setSelectedDevice(device);
    }
   
    return(
        <div style={{ paddingRight:"15px"}} onClick={selectedCard}>
            <Paper elevation={4} >
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"200px", width:"200px"}}>
                    <h2>{device.maximumHourlyConsumption}</h2>
                    <h2>{device.description}</h2>
                    <h3>{device.address}</h3>
                </div>
            </Paper>
        </div>
    );
}

export default DeviceCard;