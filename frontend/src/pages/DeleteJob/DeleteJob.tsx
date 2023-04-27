import React from "react";
import "./DeleteJob.scss";
import { IJob } from "../../types/job.type";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { deleteJobUrl } from "../../constants/url.constants";

const DeleteJob = () => {
    const redirect = useNavigate();
    const { id } = useParams();

    const handleDeleteBtnClick = () => {
        axios
            .delete(`${deleteJobUrl}/${id}`)
            .then((resposne) => redirect("/Jobs", { state: { message: "Jobs Deleted Successfully" } }))
            .catch((error) => alert("Error"));
    };

    const handleBackBtnClick = () => {
        redirect("/Jobs");
    };

    return (
        <div className="delete-job">
            <h2>Delete Product</h2>
            <h4>Are You Sure You want to delete this Job?</h4>

            <div>
                <Button variant="outlined" color="error" onClick={handleDeleteBtnClick}>
                    Yes Delete It
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleBackBtnClick}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default DeleteJob;