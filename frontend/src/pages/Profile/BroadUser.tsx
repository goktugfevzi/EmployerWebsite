import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { IUser } from "../../types/user.type";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { IJob } from "../../types/job.type";
import JobTable from "../../components/JobTable/JobTable";

const BoardUser: React.FC = () => {
    const [jobList, setJobList] = useState<IJob[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [departmentName, setDepartmentName] = useState("");
    const location = useLocation();
    const redirect = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const user = AuthService.getCurrentUser();
            if (user) {
                setUser(user);
                const jobList = await AuthService.getUserJob(user.id);
                const inactiveJobs = jobList.filter(
                    (job: IJob) => job.status === false
                );
                setJobList(inactiveJobs);
                if (location?.state) {
                    Swal.fire({
                        icon: "success",
                        title: location?.state?.message,
                    });
                    redirect(location.pathname, { replace: true });
                }
                if (user.departmentId === 1) {
                    setDepartmentName("Yazılım");
                } else if (user.departmentId === 2) {
                    setDepartmentName("IK");
                } else {
                    setDepartmentName("Muhasebe");
                }
            }
        };
        fetchData();
    }, []);

    const handleJobComplete = async (id: string) => {
        const updatedJobs = jobList.map(async (job) => {
            if (job.jobId === id) {
                if (job.status == true) {
                    job.status = false;
                } else {
                    job.status = true;
                }
                await AuthService.updateJobStatus(id, job.status);
            }
            window.location.reload();
            return job;
        });
        const jobs = await Promise.all(updatedJobs);
        console.log(jobs);
        setJobList(jobs);
    };

    const handlePasswordReset = () => {
        redirect(`/change-password`);
    };
    console.log(jobList);
    return (
        <div className="Profile">
            <h3>{user?.userName}</h3>
            <h3>{user?.email}</h3>
            <h3>{departmentName}</h3>
            <Button
                variant="contained"
                sx={{ mx: 3 }}
                onClick={handlePasswordReset}
            >
                Şifre Yenile
            </Button>
            <div className="Jobs">
                <h1>Jobs:</h1>
                {jobList.length < 0 ? (
                    <h1>No Jobs</h1>
                ) : (
                    <div className="table-wrapper">
                        <JobTable
                            jobList={jobList}
                            handleJobComplete={handleJobComplete}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardUser;
