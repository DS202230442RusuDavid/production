import axios from "axios";
import Energy from "../dtos/energy.dto";

const ip = process.env.backendIP || "";

export const getEnergy = async (id: number) => {
    var config = {
        method: "post",
        url: ip + "/energy/getEnergy",
        data: { "device.id": id },
    };
    
    return axios(config)
        .then(function (res) {
        return res.data as Energy[];
        })
        .catch(function (error) {
        console.log(error);
        return [] as Energy[];
        });
    }

export const getDeviceEnergy = async (id: number) => {
    console.log(id);
    var config = {
        method: "post",
        url: ip + "/energy/getEnergy",
        data: { "device.id": id },
    };

    return axios(config)
        .then(function (res) {
        return res.data as Energy[];
        })
        .catch(function (error) {
        console.log(error);
        return [] as Energy[];
        });
    }