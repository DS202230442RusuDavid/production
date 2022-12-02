import Device from "../dtos/device.dto";
import DeviceCard from "./deviceCard.component";
import "./deviceCarousel.component.css";
interface Props {
    devices: Device[],
    setSelectedDevice: React.Dispatch<React.SetStateAction<Device>>,
}


const DeviceCarousel = (props: Props) => {
    return(
        <div style={{display:"flex",flexDirection:"row", overflow:"scroll",maxWidth:"98vw", padding:"5px"}}>
            {props.devices.map((device: Device) => {
                return(
                        <DeviceCard device={device} setSelectedDevice={props.setSelectedDevice}/>
                );
            })}
        </div>
    );
}

export default DeviceCarousel;