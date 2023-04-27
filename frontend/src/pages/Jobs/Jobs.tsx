import { useState, useEffect } from "react";
import axios from "axios";
import "./Jobs.scss";
import { IJob } from "../../types/job.type";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { baseUrl } from "../../constants/url.constants";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<IJob[]>([])
    const location = useLocation();
    const redirect = useNavigate();

    const fetchJobsList = async () => {
        try {
            const response = await axios.get(baseUrl)
            setJobs(response.data.responseData);
            if (location?.state) {
                Swal.fire({
                    icon: "success",
                    title: location?.state?.message,
                });
                redirect(location.pathname, { replace: true });
            }
        } catch (error) {
            alert("An Error Happend on fetching..");
        }
    };

    useEffect(() => {
        fetchJobsList();
    }, [])






    const redirectToEditPage = (id: string) => {
        redirect(`/jobs/edit/${id}`);
    };

    const redirectToDeletePage = (id: string) => {
        redirect(`/jobs/delete/${id}`);
    };
    return (

        <div className="Jobs">
            <h1>Jobs List</h1>
            {jobs.length < 0 ? (
                <h1>No Jobs</h1>
            ) : (
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Experience</th>
                                <th>Salary</th>
                                <th>description</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                jobs.map((job, index) => (
                                    <tr key={index}>
                                        <td>{job.title}</td>
                                        <td>{job.company}</td>
                                        <td>{job.location}</td>
                                        <td>{job.experience}</td>
                                        <td>{job.salary}</td>
                                        <td>{job.description}</td>
                                        <td>
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                sx={{ mx: 3 }}
                                                onClick={() => redirectToEditPage(job.jobID)}
                                            >
                                                <Edit />
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{ mx: 3 }}
                                                onClick={() => redirectToDeletePage(job.jobID)}
                                            >
                                                <Delete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default Jobs;