import React, { useState } from "react";
import { IUserRegister } from "../../../types/user.register.type";
import axios from "axios";
import "../../Auth/Signup/Signup.scss";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Alert,
} from "@mui/material";
import { SignUpUrl } from "../../../constants/url.constants";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const redirect = useNavigate();
    const [user, setUser] = useState<IUserRegister>({
        username: "",
        email: "",
        password: "",
        department: "",
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
            department: event.target.value,
        });
    };
    const handleInputChange = () => {
        if (
            user.email === "" ||
            user.password === "" ||
            user.username === "" ||
            user.department === null
        ) {
            console.log("karakter gir");
        }
        const data: Partial<IUserRegister> = {
            username: user.username,
            email: user.email,
            password: user.password,
            department: user.department,
        };
        axios
            .post(SignUpUrl, data)
            .then((resposne) =>
                redirect("/login", {
                    state: { message: "User Created Successfully" },
                })
            )
            .catch((error) => alert("Error"));
            setErrorMessage("Kullanıcı adı veya şifre hatalı");
    };

    return (
        <div className="singup">
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
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={user.email}
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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Department
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.department}
                        label="Department"
                        onChange={changeHandlers}
                    >
                        <MenuItem value={1}>YAZILIM</MenuItem>
                        <MenuItem value={2}>MUHASEBE</MenuItem>
                        <MenuItem value={3}>HR</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="outlined"
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
