import React, { useEffect, useState } from "react";
import { IUserLogin } from "../../../types/user.login.type";
import "../../Auth/Login/Login.scss";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";

const Login: React.FC = () => {
    const redirect = useNavigate();
    const [user, setUser] = useState<IUserLogin>({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };
    const handleInputChange = async () => {
        if (user.password === "" || user.username === "") {
            setErrorMessage("Lütfen kullanıcı adı ve şifre girin.");
            return;
        }

        try {
            const response = await AuthService.login(
                user.username,
                user.password
            );
            const users = await AuthService.getCurrentUser();
            const userRole = await AuthService.getCurrentUserRole(
                users.id as string
            );

            if (userRole[0] === "ADMIN") {
                redirect("/admin", {
                    state: { message: "Admin Login Successfully" },
                });
                document.location.reload();
            } else if (userRole[0] === "USER") {
                redirect("/user", {
                    state: { message: "User Login Successfully" },
                });
                document.location.reload();
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Kullanıcı adı veya şifre hatalı");
        }
    };

    const handleBackBtnClick = () => {
        redirect("signup");
    };
    useEffect(() => {
        setTimeout(() => {
            document.location.reload();
        }, 300000000);
    }, []);

    return (
        <div className="loginpage">
            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage("")}>
                    {errorMessage}
                </Alert>
            )}
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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleInputChange}
                >
                    LOGIN
                </Button>

                <Typography
                    className="typography-style"
                    onClick={handleBackBtnClick}
                >
                    {" "}
                    Hesabın Yok mu ?
                </Typography>
            </div>
        </div>
    );
};

export default Login;
