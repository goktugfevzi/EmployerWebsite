import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { IUser } from "../../types/user.type";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { IJob } from "../../types/job.type";

const BoardAdmin: React.FC = () => {
  const [jobList, setJobList] = useState<IJob[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const location = useLocation();
  const redirect = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUser(user); //(user)
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
      <h3>Name : {user?.userName}</h3>
      <h3>Mail : {user?.email}</h3>
      <h3>Department Name : {departmentName}</h3>
      <button onClick={handlePasswordReset}>Şifre Yenile</button>
    </div>
  );
};

export default BoardAdmin;
