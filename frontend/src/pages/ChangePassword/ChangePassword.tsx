import React from "react";
import "./ChangePassword.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { IUserChangePassword } from "../../types/user.changepassword.type";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";

const EditJob: React.FC = () => {
    const [userPassword, setUserPassword] = React.useState<Partial<IUserChangePassword>>({ newpassword: "", currentpassword: "", email: "" });
    const redirect = useNavigate();
    const location = useLocation();


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword({
            ...userPassword,
            [event.target.name]: event.target.value,
        });
    };
    const handleBackBtnClick = () => {
        redirect("/admin");
    };

    const handleSaveBtnClick = async () => {
        if (userPassword.email === "" || userPassword.currentpassword === "" || userPassword.newpassword === "") {
            console.log("karakter gir");
        }
        const data: Partial<IUserChangePassword> = {
            newpassword: userPassword.newpassword,
            email: userPassword.email,
            currentpassword: userPassword.currentpassword,
        };
        try {
            const response = await AuthService.changePassword(data);
            if (response.name == "AxiosError") {
                console.log(response.message);
                Swal.fire({
                    icon: "error",
                    title: response.message,
                });
            } else if (response.code == "Success") {
                console.log(response.message);
                redirect("/admin", { state: { message: response.message } });
            }
            else if (response.PasswordMismatch) {
                Swal.fire({
                    icon: "error",
                    title: response.PasswordMismatch.errors[0].errorMessage,
                });
            }

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="change-password">
            <h2>Change Password</h2>

            <TextField
                autoComplete="off"
                label="Email"
                variant="outlined"
                name="email"
                value={userPassword.email}
                onChange={changeHandler}
            />


            <TextField
                autoComplete="off"
                label="Current Password"
                variant="outlined"
                name="currentpassword"
                value={userPassword.currentpassword}
                onChange={changeHandler}
            />
            <TextField
                autoComplete="off"
                label="New Password"
                variant="outlined"
                name="newpassword"
                value={userPassword.newpassword}
                onChange={changeHandler}
            />
            <div>
                <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
                    Save
                </Button>

                <Button variant="outlined" color="secondary" onClick={handleBackBtnClick}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default EditJob;