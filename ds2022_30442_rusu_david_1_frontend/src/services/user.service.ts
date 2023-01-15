import User from "../dtos/user.dto";
import axios from "axios";

const ip = process.env.backendIP || "http://int32.duckdns.org:3000";
// const ip = "http://localhost:3000"

export const getLoggedInUser = () : User => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user) as User;
    } else {
        return {} as User;
    }
}

export const getAllUsers = async () =>{
    var config = {
      method: "post",
      url: ip + "/user/getUser",
      withCredentials: true,
      data: {},
    };
  
    return axios(config)
      .then(function (res) {
        return res.data as User[];
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  }
  
  export const updateUser = async (user: User) =>{
    var config = {
      method: "patch",
      url: ip + "/user/",
      withCredentials: true,
      data: user,
    };
  
    return axios(config)
      .then(function (res) {
        return res.data as User;
      })
      .catch(function (error) {
        console.log(error);
        return {} as User;
      });
  
  }

  export const deleteUser = async (user: User) =>{
    var config = {
      method: "delete",
      url: ip + "/user",
      withCredentials: true,
      data: { id: user.id },
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