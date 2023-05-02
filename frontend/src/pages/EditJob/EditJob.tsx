import React from "react";
import { IJob } from "../../types/job.type";
import "./EditJob.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { updateJobUrl, getJobByIdUrl } from "../../constants/url.constants";

const EditJob: React.FC = () => {
    const [job, setJob] = React.useState<Partial<IJob>>({ title: "", description: ""});

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
            })
        );
    }, []);


    const handleSaveBtnClick = () => {
        if (job.title === "" ||  job.description === "" ) {
            console.log("karakter gir");
        }
        const data: Partial<IJob> = {

            title: job.title,
            description: job.description,
  
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
                label="description"
                variant="outlined"
                name="description"
                value={job.description}
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