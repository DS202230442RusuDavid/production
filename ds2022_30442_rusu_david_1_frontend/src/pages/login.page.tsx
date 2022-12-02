import { Dispatch, SetStateAction } from "react";
import Layout from "../components/layout.component";
import LoginRegisterForm from "../components/loginForm.component";
import User from "../dtos/user.dto";
import { getLoggedInUser } from "../services/user.service";

const LoginPage = () => {
  const user = getLoggedInUser();

  //if user is logged in, redirect to home page
  if (user.id) {
    window.location.href = "/home";
  }

  return (
    <Layout>
      <LoginRegisterForm page={"login"}/>
    </Layout>
  );
}

export default LoginPage;