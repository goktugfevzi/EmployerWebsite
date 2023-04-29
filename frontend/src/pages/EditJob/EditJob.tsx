import React from "react";
import { IJob } from "../../types/job.type";
import "./EditJob.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { updateJobUrl, getJobByIdUrl } from "../../constants/url.constants";

const EditJob: React.FC = () => {
    const [job, setJob] = React.useState<Partial<IJob>>({ title: "", company: "", description: "", location: "", salary: "", experience: "" });

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
                company: response.data.company,
                description: response.data.description,
                salary: response.data.salary,
                location: response.data.location,
                experience: response.data.experience,
            })
        );
    }, []);


    const handleSaveBtnClick = () => {
        if (job.title === "" || job.company === "" || job.description === "" || job.location === "" || job.salary === "" || job.experience === "") {
            console.log("karakter gir");
        }
        const data: Partial<IJob> = {
            company: job.company,
            title: job.title,
            description: job.description,
            salary: job.salary,
            location: job.location,
            experience: job.experience,
        };
        axios
            .put(`${updateJobUrl}/${id}`, data)
            .then((resposne) => redirect("/Jobs", { state: { message: "Job Updated Successfully" } }))
            .catch((error) => alert("Error"));
    };
    return (
        <div className="edit-job">
            <h2>Edit Job</h2>
            <TextField
                autoComplete="off"
                label="company"
                variant="outlined"
                name="company"
                value={job.company}
                onChange={changeHandler}
            />
            <TextField
                autoComplete="off"
                label="experience"
                variant="outlined"
                name="experience"
                value={job.experience}
                onChange={changeHandler}
            /> <TextField
                autoComplete="off"
                label="description"
                variant="outlined"
                name="description"
                value={job.description}
                onChange={changeHandler}
            />
            <TextField
                autoComplete="off"
                label="salary"
                variant="outlined"
                name="salary"
                value={job.salary}
                onChange={changeHandler}
            />
            <TextField
                autoComplete="off"
                label="location"
                variant="outlined"
                name="location"
                value={job.location}
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