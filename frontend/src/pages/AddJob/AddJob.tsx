import React from "react";
import "./AddJob.scss";
import { TextField, Button } from "@mui/material";
import { IJob } from "../../types/job.type";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addJobUrl } from "../../constants/url.constants";

const AddProduct: React.FC = () => {
    const [job, setProduct] = React.useState<Partial<IJob>>({ title: "", company: "", description: "", location: "", salary: "", experience: "" });
    const redirect = useNavigate();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...job,
            [event.target.name]: event.target.value,
        });
    };

    const handleSaveBtnClick = () => {
        if (job.title === "" || job.company === "" || job.description === "" || job.location === "" || job.salary === "" || job.experience === "") {
            alert("Enter Values");
            return;
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
            .post(addJobUrl, data)
            .then((resposne) => redirect("/jobs", { state: { message: "Job Created Successfully" } }))
            .catch((error) => alert("Error"));
    };

    const handleBackBtnClick = () => {
        redirect("/jobs");
    };

    return (
        <div className="add-job">
            <h2>Add New job</h2>
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
            />
            <TextField
                autoComplete="off"
                label="description"
                variant="outlined"
                name="description"
                value={job.description}
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

export default AddProduct;