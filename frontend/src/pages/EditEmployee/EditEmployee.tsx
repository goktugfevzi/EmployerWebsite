import React from "react";
import { IUser } from "../../types/user.type";
import "./EditEmployee.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { getUserByIdUrl, updateUserUrl } from "../../constants/url.constants";
import LoginTextInput from "../../components/LoginTextInput/LoginTextInput";

const EditEmployee: React.FC = () => {
    const [user, setUser] = React.useState<Partial<IUser>>({});
    const redirect = useNavigate();
    const { id } = useParams();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleBackBtnClick = () => {
        redirect("/users");
    };

    React.useEffect(() => {
        console.log(id);
        axios.get<IUser>(`${getUserByIdUrl}${id}`).then((response) =>
            setUser({
                userName: response.data.responseData.userName,
                email: response.data.responseData.email,
                departmentId: response.data.responseData.departmentId,
            })
        );
        console.log(user);
    }, []);

    const handleSaveBtnClick = () => {
        if (user.userName === "" || user.email === "") {
            console.log("karakter gir");
        }
        const data: Partial<IUser> = {
            userName: user.userName,
            email: user.email,
            departmentId: user.departmentId,
        };
        axios
            .put(`${updateUserUrl}${id}`, data)
            .then((resposne) =>
                redirect("/users", {
                    state: { message: "user Updated Successfully" },
                })
            )
            .catch((error) => alert("Error"));
    };

    const changeHandlers = (event: SelectChangeEvent<string>) => {
        setUser({
            ...user,
            departmentIdConverted: event.target.value,
        });
    };
    return (
        <div className="employee">
            <h2>Edit Personnel</h2>
            <LoginTextInput
                email={user.email}
                userName={user.userName}
                changeHandler={changeHandler} 
                departmenId={user.departmentIdConverted}
                changeHandlers={changeHandlers}
            />
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSaveBtnClick}
                >
                    Save
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBackBtnClick}
                >
                    Back
                </Button>
            </div>
        </div>
    );
};

export default EditEmployee;
