import { useState, useEffect } from "react";
import axios from "axios";
import "./Jobs.scss";
import { IJob } from "../../types/job.type";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { baseUrl, deleteJobUrl } from "../../constants/url.constants";
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
        setTimeout(() => {
            document.location.reload();
        }, 300000000);
    }, []);

    const handleDeleteBtnClick = (id: number) => {
        console.log(id);
        axios
            .delete(`${deleteJobUrl}/${id}`)
            .then((response) => redirect("/jobs", { state: { message: "Jobs Deleted Successfully" } }))
            .then(() => window.location.reload())
            .catch((error) => alert("Error"));
    };

    const redirectToEditPage = (id: number) => {
        console.log(id);

        redirect(`/jobs/edit/${id}`);
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

                            {jobs.map((job) => (
                                <tr key={job.jobId}>
                                    <td>{job.title}</td>
                                    <td>{job.description}</td>
                                    <td>
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            sx={{ mx: 3 }}
                                            onClick={() => redirectToEditPage(job.jobId)}
                                        >
                                            <Edit />
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{ mx: 3 }}
                                            onClick={() => handleDeleteBtnClick(job.jobId)}
                                        >
                                            <Delete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default Jobs;