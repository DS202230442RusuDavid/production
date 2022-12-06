import Device from "../dtos/device.dto";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { getUserDevices } from "../services/device.service";

const socket = io(process.env.websocket || "http://int32.duckdns.org:3000");

const DeviceConsumptionPopUp =  () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [isConnected, setIsConnected] = useState(socket.connected);
    let devices : Device[] = [];

    useEffect(() => {
      const fetchData = async () => {
          devices = await getUserDevices(user);
      }
      fetchData();
  }, []);

    //future improvement: only show alerts for devices that are in the user's list
    const alerts : [{
        deviceId: number,
    }] = [{deviceId:-1}];
    useEffect(() => {
      socket.on('connect', () => {
        console.log("websocket connected");
        setIsConnected(true);
      });
  
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
  
      socket.on('alert', msg => {
        //
        console.log(msg);
        //see if device is not in the alerts array and belongs to the user
        const device = !alerts.find((device) => device.deviceId === msg.deviceId) && devices.find((device) => device.id === msg.deviceId);
        if(device){
          alert("device " + msg.deviceId + " has consumed " + msg.hourlyConsumption + "kw in the last hour!");
        }
        alerts.push(msg);
      });

      //every hour clear the alerts array
      setInterval(() => {
        alerts.splice(0,alerts.length);
      }, 3600000);
    }, []);
  
    return (
      <div>
      </div>
    );
}

export default DeviceConsumptionPopUp;