import axios from "axios";
import Device from "../dtos/device.dto";
import User from "../dtos/user.dto";

const ip = process.env.backendIP || "http://int32.duckdns.org:3000";
// const ip = "http://localhost:3000"

export const getUserDevices = async (user: User) => {
  var config = {
    method: "post",
    withCredentials: true,
    url: ip + "/device/getDevices",
    data: { "user.id": user.id },
  };

  return axios(config)
    .then(function (res) {
      return res.data as Device[];
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
};

export const getDevice = async (id: number) => {
  var config = {
    method: "post",
    withCredentials: true,
    url: ip + "/device/getDevices",
    data: { id: id },
  };

  return axios(config)
    .then(function (res) {
      return res.data[0] as Device;
    })
    .catch(function (error) {
      console.log(error);
      return {} as Device;
    });
}

export const getUnassignedDevices = async () => {
  var config = {
    method: "post",
    url: ip + "/device/getDevices",
    withCredentials: true,
    data: { "user.id": null },
  };

  return axios(config)
    .then(function (res) {
      return res.data as Device[];
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
};

export const getAllDevices = async () => {
  var config = {
    method: "post",
    url: ip + "/device/getDevices",
    withCredentials: true,
    data: {},
  };

  return axios(config)
    .then(function (res) {
      return res.data as Device[];
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
};

export const updateDevice = async (device: Device, user?: User) => {
  var config = {
    method: "patch",
    url: ip + "/device/",
    withCredentials: true,
    data: user?{ ...device,maximumHourlyConsumption: Number(device.maximumHourlyConsumption) ,"userId": user.id }:{ ...device,maximumHourlyConsumption: Number(device.maximumHourlyConsumption)},
  };

  console.log(config);

  return axios(config)
    .then(function (res) {
      
      return res.data as Device;
    })
    .catch(function (error) {
      console.log(error);
      return {} as Device;
    });
}

export const createDevice = async (device: Device) => {
  var config = {
    method: "post",
    url: ip + "/device/",
    withCredentials: true,
    data: {...device, maximumHourlyConsumption: Number(device.maximumHourlyConsumption)},
  };

  console.log(device);

  return axios(config)
    .then(function (res) {
      return res.data as Device;
    })
    .catch(function (error) {
      console.log(error);
      return {} as Device;
    });
}

export const deleteDevice = async (device: Device) => {
  console.log(device);
  var config = {
    method: "delete",
    url: ip + "/device/",
    withCredentials: true,
    data: { id: device.id },
  };

  return axios(config)
    .then(function (res) {
      return res.status;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.status;
    });
}
