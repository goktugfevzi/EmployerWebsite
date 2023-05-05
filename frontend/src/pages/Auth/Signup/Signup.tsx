import React, { useState } from "react";
import { IUserRegister } from "../../../types/user.register.type";
import axios from "axios";
import "../../Auth/Signup/Signup.scss";
import { TextField, Button, SelectChangeEvent, Alert } from "@mui/material";
import { SignUpUrl } from "../../../constants/url.constants";
import { useNavigate } from "react-router-dom";
import LoginTextInput from "../../../components/LoginTextInput/LoginTextInput";
import { useHandleInputChange } from "../../../components/HandleInputChange/useHandleInputChange";

const SignUp: React.FC = () => {
    const redirect = useNavigate();
    const [user, setUser] = useState<IUserRegister>({
        userName: "",
        email: "",
        password: "",
        departmentId: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const changeHandlers = (event: SelectChangeEvent<string>) => {
        setUser({
            ...user,
            departmentId: event.target.value,
        });
    };
    const handleInputChange = useHandleInputChange(user, (data) => {
        axios
            .post(SignUpUrl, data)
            .then((resposne) =>
                redirect("/login", {
                    state: { message: "User Created Successfully" },
                })
            )
            .catch((error) => alert("Error"));
    });

    return (
        <div className="singup">
            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage("")}>
                    {errorMessage}
                </Alert>
            )}
            <div className="form">
                <LoginTextInput
                    email={user.email}
                    userName={user.userName}
                    changeHandler={changeHandler}
                    departmenId={user.departmentId}
                    changeHandlers={changeHandlers}
                />

                <TextField
                    autoComplete="on"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInputChange}
                >
                    SIGN UP
                </Button>
            </div>
        </div>
    );
};

export default SignUp;
