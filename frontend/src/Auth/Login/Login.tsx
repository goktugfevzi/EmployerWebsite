import React, { useEffect, useState } from 'react';
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
    const handleInputChange = async () => {
        if (user.password === "" || user.username === "") {
            console.log("karakter gir");
        }
        console.log("login çalışıyor");

        try {
            const response = await AuthService.login(user.username, user.password);
            console.log("ilk the içerisindeyim");

            const users = await AuthService.getCurrentUser();
            const userRole = await AuthService.getCurrentUserRole(users.id as string);

            console.log("if dışındayim");
            if (userRole[0] === "ADMIN") {
                console.log("if içindeyim");
                redirect("/admin", { state: { message: "Admin Login Successfully" } });
                document.location.reload();
            } else if (userRole[0] === "USER") {
                console.log("if içindeyim");
                redirect("/user", { state: { message: "User Login Successfully" } });
                document.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBackBtnClick = () => {
        redirect("signup");
    }
    useEffect(() => {
        setTimeout(() => {
            document.location.reload();
        }, 300000000);
    }, []);

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