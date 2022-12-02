import axios from "axios";
import Device from "../dtos/device.dto";
import User from "../dtos/user.dto";


export const getUserDevices = async (user: User) => {
  var config = {
    method: "post",
    url: "/device/getDevices",
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
    url: "/device/getDevices",
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
    url: "/device/getDevices",
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
    url: "/device/getDevices",
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
    url: "/device/",
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
    url: "/device/",
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
    url: "/device/",
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
