import Layout from "../components/layout.component";
import LoginRegisterForm from "../components/loginForm.component";


const RegisterPage = () => {
return (
    <Layout>
      <LoginRegisterForm page={"register"}/>
    </Layout>
  );
}

export default RegisterPage;