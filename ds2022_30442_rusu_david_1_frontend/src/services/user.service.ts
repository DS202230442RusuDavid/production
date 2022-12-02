import User from "../dtos/user.dto";
import axios from "axios";

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
      url: "/user/getUser",
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
      url: "/user/",
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
      url: "/user",
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