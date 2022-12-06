import React, { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { login, register } from '../services/auth.service';
import Role from '../dtos/role.dto';
import { Checkbox, FormControlLabel } from '@mui/material';
import User from '../dtos/user.dto';

interface Props {
    page: "login" | "register";
}

export default class LoginRegisterForm extends React.Component<Props> {

    state = {
        formData: {
            email: '',
            password: '',
            admin: false,
        },
        submitted: false,
    }

    handleChange = (event: any) => {
        const { formData } = this.state;
        const index: 'email' | "password" = event.target.name;
        formData[index] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = async () => {
        this.setState({ submitted: true });
        if (this.props.page === "login") {
            await this.login();
        } else {
            await this.register();
        }
    }

    login = async () => {
            const rez = await login(this.state.formData.email, this.state.formData.password);
            if (rez) {
                // window.location.href = "/home";
                alert("OK");
            } else {
                alert("Wrong credentials");
                this.setState({ submitted: false });
            }
    }

    register = async () => {
        const role = this.state.formData.admin ? Role.Admin : Role.User;
        const rez: any = await register(this.state.formData.email, this.state.formData.password, role);
        console.log(rez);

        if (rez.status === 400) {
            alert(rez.data.response.data.message);
            this.setState({ submitted: false });
        } else {
            alert("User created!");
            window.location.href = "/login";
        }
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
                style={{ paddingTop: "20px" }}
            >

                <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    type='password'
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {this.props.page === "login" ?

                        <Button
                            color="primary"
                            variant="contained"
                            type="button"
                            disabled={submitted}
                            onClick={() => window.location.href = "/register"}
                        >
                            Register
                        </Button>
                        // This checkbox is probably done very stupidly but i got no time to see how to properly do it :(
                        : <FormControlLabel control={<Checkbox />} label="Admin" onChange={() => { this.state.formData.admin = !this.state.formData.admin }} />
                    }
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={submitted}
                    >
                        Submit
                    </Button>

                </div>
            </ValidatorForm>
        );
    }
}