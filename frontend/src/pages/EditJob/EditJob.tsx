import React, { useEffect, useState } from "react";
import { IJob } from "../../types/job.type";
import "./EditJob.scss";
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
import { updateJobUrl, getJobByIdUrl } from "../../constants/url.constants";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const EditJob: React.FC = () => {
    const redirect = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState<Partial<IJob>>({
        departmentIdConverted: "",
        title: "",
        description: "",
        deadline: "",
    });
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    useEffect(() => {
        axios.get<IJob>(`${getJobByIdUrl}/${id}`).then((response) =>
            setJob({
                title: response.data.responseData.title,
                description: response.data.responseData.description,
                deadline: response.data.responseData.deadline,
                departmentId: response.data.responseData.departmentId,
            })
        );
    }, []);
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJob({
            ...job,
            [event.target.name]: event.target.value,
        });
    };

    const handleBackBtnClick = () => {
        redirect("/Jobs");
    };

    const handleSaveBtnClick = () => {
        if (
            job.title === "" ||
            job.description === "" ||
            job.departmentIdConverted === "" ||
            job.deadline === ""
        ) {
            console.log("karakter gir");
        }
        const newDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
        const data: Partial<IJob> = {
            title: job.title,
            description: job.description,
            deadline: newDate.toISOString(),
            departmentId: job.departmentId,
        };
        axios
            .put(`${updateJobUrl}/${id}`, data)
            .then((resposne) =>
                redirect("/Jobs", {
                    state: { message: "Job Updated Successfully" },
                })
            )
            .catch((error) => alert("Error"));
    };

    const changeHandlers = (event: SelectChangeEvent<string>) => {
        setJob({
            ...job,
            departmentIdConverted: event.target.value,
        });
    };
    return (
        <div className="edit-job">
            <h2>Edit Job</h2>
            <TextField
                autoComplete="off"
                label="Description"
                variant="outlined"
                name="description"
                value={job.description}
                onChange={changeHandler}
            />

            <div className="date-picker-container">
                <label>Deadline: </label>
                <DatePicker
                    onChange={(date) => handleDateChange(date)}
                    value={selectedDate}
                    format="dd/MM/yyyy"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    monthAriaLabel="Month"
                    yearAriaLabel="Year"
                    className="date-picker"
                />
            </div>
            <TextField
                autoComplete="off"
                label="Title"
                variant="outlined"
                name="title"
                value={job.title}
                onChange={changeHandler}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Department
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={job.departmentIdConverted || ""}
                    label="Department"
                    onChange={changeHandlers}
                >
                    <MenuItem value={1}>YAZILIM</MenuItem>
                    <MenuItem value={2}>MUHASEBE</MenuItem>
                    <MenuItem value={3}>HR</MenuItem>
                </Select>
            </FormControl>
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

export default EditJob;
