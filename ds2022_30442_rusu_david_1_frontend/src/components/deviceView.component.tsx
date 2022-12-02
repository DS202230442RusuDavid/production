import React from "react";
import Device from "../dtos/device.dto";
import { getDeviceEnergy } from "../services/energy.service";
import BarGraph from "./barGraph.component";
import CalendarComp from "./calendar.component";

interface Props {
    device: Device,
}

//TODO, get data from db, add state to this component and pass it to the calander

const getDeviceData = async (device: Device, selectedDate: Date) => {
    if(device === undefined || device.id === undefined) return [];

    const data = await getDeviceEnergy(device.id);

    return data.filter(energy =>{
        const date = new Date(energy.timeStamp);
        return new Date(energy.timeStamp).getDate() === selectedDate.getDate() &&
        new Date(energy.timeStamp).getMonth() === selectedDate.getMonth() &&
        new Date(energy.timeStamp).getFullYear() === selectedDate.getFullYear();
    }).map((item) => {
        return {
            x: item.timeStamp.toString(),
            y: item.consumption
        }
    }).sort((a, b) => {
        return new Date(a.x).getTime() - new Date(b.x).getTime();
    })
}

const DeviceView = ({device}: Props) => {
    const [deviceData, setDeviceData] = React.useState([] as { x: string, y: number }[]);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getDeviceData(device, selectedDate);
            setDeviceData(data);
        }
        fetchData();        
    }, [device,selectedDate]);


    return (
        <div>
            {device.id ?
                <div style={{width:"90vw"}}>
                    <div style={{textAlign:'center'}}>
                        <h1>{device.description}</h1>
                    </div>

                    <div style={{ display: "flex", alignContent: "space-between", flexDirection: "row" }}>
                        <div style={{width:"70%"}}>
                            {deviceData.length > 0 ? <BarGraph data={deviceData} /> : <div>No energy data currently available</div>}
                        </div>
                        <div style={{padding:"5%"}}>
                            <CalendarComp selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>   
                        </div>
                    </div>
                </div>
                : <h1>No device selected</h1>}
        </div>
    );
}

export default DeviceView;