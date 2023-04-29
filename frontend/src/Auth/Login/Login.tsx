import React, { useState } from 'react';
import { IUserLogin } from '../../types/user.login.type';
import axios from "axios";
import '../../Auth/Login/Login.scss'

import { TextField, Button, Typography } from "@mui/material";
import { LogInUrl } from '../../constants/url.constants';
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/auth.service';

const Login: React.FC = () => {

    const redirect = useNavigate();
    const [user, setUser] = useState<IUserLogin>({
        username: "",
        password: "",
    });

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };
    const handleInputChange = () => {
        if (user.password === "" || user.username === "") {
            console.log("karakter gir");
        }
        AuthService.login(user.username, user.password)
            .then((resposne) => {
                console.log("ilk the içerisindeyim");
                const user = AuthService.getCurrentUser();
           
                AuthService.getCurrentUserRole(user.id as string)
                    .then((userRole) => {
                       console.log("if dışındayim");
                       console.log(userRole);
                       console.log(userRole);
                       console.log(userRole);
                       console.log(userRole);
                       console.log(userRole);
                        if (userRole[0] === "ADMIN") {
                            redirect("/admin", { state: { message: "Admin Login Successfully" } })
                        } else if (userRole[0] === "USER") {
                            redirect("/user", { state: { message: "User Login Successfully" } })

                        }
                    })
                    .catch((error) => alert("Role ERROR"));
            })
            .catch((error) => alert("Error"));
    };
    const handleBackBtnClick = () => {
        redirect("Signup");
    }

    return (
        <div className="loginpage">
            <div className="form">
                <TextField
                    autoComplete="on"
                    label="Name"
                    variant="outlined"
                    name="username"
                    value={user.username}
                    onChange={changeHandler}
                />
                <TextField
                    autoComplete="on"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                />
                <Button variant="outlined" color="primary" onClick={handleInputChange}>LOGIN</Button>

                <Typography className="typography-style" onClick={handleBackBtnClick}> Hesabın Yok mu ?</Typography>
            </div>
        </div>
    );
};

export default Login;