import React from "react";
import { IJob } from "../../types/job.type";
import "./EditJob.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { updateJobUrl, getJobByIdUrl } from "../../constants/url.constants";

const EditJob: React.FC = () => {
    const [job, setJob] = React.useState<Partial<IJob>>({ departmentIdConverted: "", title: "", description: "" });
    const redirect = useNavigate();
    const { id } = useParams();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJob({
            ...job,
            [event.target.name]: event.target.value,
        });
    };

    const handleBackBtnClick = () => {
        redirect("/Jobs");
    };

    React.useEffect(() => {
        axios.get<IJob>(`${getJobByIdUrl}/${id}`).then((response) =>
            setJob({
                title: response.data.title,
                description: response.data.description,
                deadline: response.data.deadline,
                departmentId: response.data.departmentId
            })
        );
    }, []);


    const handleSaveBtnClick = () => {
        if (job.title === "" || job.description === "" || job.departmentIdConverted === "" || job.deadline === "") {
            console.log("karakter gir");
        }
        const data: Partial<IJob> = {
            title: job.title,
            description: job.description,
            deadline: job.deadline,
            departmentId: job.departmentId
        };
        axios
            .put(`${updateJobUrl}/${id}`, data)
            .then((resposne) => redirect("/Jobs", { state: { message: "Job Updated Successfully" } }))
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
            <TextField
                autoComplete="off"
                label="Deadline"
                placeholder="2023-05-05T00:00:00"
                variant="outlined"
                name="deadline"
                value={job.deadline}
                onChange={changeHandler}
            />
            <TextField
                autoComplete="off"
                label="Title"
                variant="outlined"
                name="title"
                value={job.title}
                onChange={changeHandler}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={job.departmentIdConverted}
                    defaultValue={job.departmentId?.toString()}
                    label="Department"
                    onChange={changeHandlers}
                >
                    <MenuItem value={1}>YAZILIM</MenuItem>
                    <MenuItem value={2}>MUHASEBE</MenuItem>
                    <MenuItem value={3}>HR</MenuItem>
                </Select>
            </FormControl>
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