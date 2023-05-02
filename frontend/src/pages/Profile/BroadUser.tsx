import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { IUser } from '../../types/user.type';
import { IJob } from '../../types/job.type';

interface Job {
  id: number;
  name: string;
  completed: boolean;
}

const BoardUser: React.FC = () => {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState<IJob[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [departmentName, setDepartmentName] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUser(user[0]);//(user)
        const jobList = await AuthService.getUserJob(user.id);
        setJobList(jobList);
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

  const handleJobComplete = (id: string) => {
    const updatedJobs = jobList.map((job) => {
      if (job.jobId === id) {
        job.Deadline = "tamamlandi";
      }
      return job;
    });

    // assuming you have a function to update the jobs list in the database
    // updateJobs(updatedJobs);
  };

  const handlePasswordReset = () => {
    // assuming you have a function to reset the user's password
    // resetPassword(user.email);
  };

  return (
    <div className="Profile">
      <h1>{user?.email}</h1>
      <h2>{user?.userName}</h2>
      <h3>{departmentName}</h3>
      <button onClick={handlePasswordReset}>Şifre Yenile</button>
      <h4>Jobs:</h4>
      <ul>
        {jobList.map((job) => (
          <li key={job.jobId}>
            {job.title}
            {!job.Deadline && (
              <button onClick={() => handleJobComplete(job.jobId)}>Tamamla</button>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default BoardUser;