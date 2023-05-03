import { useState, useEffect } from "react";
import axios from "axios";
import "./Jobs.scss";
import { IJob } from "../../types/job.type";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { baseUrl, deleteJobUrl } from "../../constants/url.constants";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../../types/user.type";
import AuthService from "../../services/auth.service";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [currentUser, setCurrentUser] = useState<IUser>();
    const [currentUserRole, setCurrentUserRole] = useState("");
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

    const fetchUserInfo = async () => {
        try {
            const user = AuthService.getCurrentUser();
            setCurrentUser(user);
            if (user) {
                const userRole = await AuthService.getCurrentUserRole(user.id);
                setCurrentUserRole(userRole);
            }
        } catch (error) {
            alert("An Error Happend on fetching..");
        }
    }

    useEffect(() => {
        fetchJobsList();
        fetchUserInfo();
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
    const redirectToAddPage = () => {
        redirect("/jobs/AddJobs");
    };

    const selectedJobs = async (id: number) => {
        const response = await AuthService.saveUserJob(currentUser?.id, id);
        if (response.name == "AxiosError") {
            console.log(response.message);
            Swal.fire({
                icon: "error",
                title: response.message,
            });
        }
        else {
            console.log(response.message);
            redirect("/admin", { state: { message: response.message } });
        }
    }
    console.log(currentUserRole);
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
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Created</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Process</th>
                            </tr>
                        </thead>
                        <tbody>

                            {jobs.map((job) => (
                                <tr key={job.jobId}>
                                    <td>{job.title}</td>
                                    <td>{job.description}</td>
                                    <td>{job.deadline.slice(0, 10)}</td>
                                    <td>{job.created.slice(0, 10)}</td>

                                    {job.departmentId === 1 ? <td>Muhasebe</td> : job.departmentId === 2 ? <td>Yazılım</td> : <td>İnsan Kaynakları</td>}
                                    {job.status === false ? <td>Active</td> : <td>Completed</td>}

                                    <td>

                                        {currentUserRole[0] === "USER" ?
                                            <Button variant="contained"
                                                color="warning"
                                                sx={{ mx: 3 }}
                                                onClick={() => selectedJobs(job.jobId)}
                                            ></Button>
                                            : <><Button
                                                variant="contained"
                                                color="warning"
                                                sx={{ mx: 3 }}
                                                onClick={() => redirectToEditPage(job.jobId)}
                                            >
                                                <Edit />
                                            </Button><Button
                                                variant="contained"
                                                color="error"
                                                sx={{ mx: 3 }}
                                                onClick={() => handleDeleteBtnClick(job.jobId)}
                                            >
                                                    <Delete />
                                                </Button></>}

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <IconButton
                        onClick={redirectToAddPage}
                        className="add-icon-btn"
                        sx={{
                            color: "#4CAF50",
                            "&:hover": { bgcolor: "#388E3C" },
                            fontSize: "2rem",
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
};
export default Jobs;