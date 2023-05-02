import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import { IUser } from '../../types/user.type';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { IUserJob } from '../../types/userjob.type';

const BoardAdmin: React.FC = () => {
  const [jobList, setJobList] = useState<IUserJob[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [departmentName, setDepartmentName] = useState("");
  const redirect = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUser(user);//(user)
        const jobList = await AuthService.getUserJob(user.id);
        console.log(jobList);
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

  const handleJobComplete = async (id: string) => {
    const updatedJobs = jobList.map((job) => {
      if (job.userJobId === id) {
        job.status = true;
      }
      return job;
    });
    setJobList(updatedJobs);
    await AuthService.updateJobStatus(id, jobList).then((resposne) =>
      redirect("/admin", { state: { message: "Job Updated Successfully" } })
    );
  };


  const handlePasswordReset = () => {
    // assuming you have a function to reset the user's password
    // resetPassword(user.email);
  };
  console.log(jobList);
  return (
    <div className="Profile">
      <h1>{user?.email}</h1>
      <h2>{user?.userName}</h2>
      <h3>{departmentName}</h3>
      <button onClick={handlePasswordReset}>Şifre Yenile</button>
      <h4>Jobs:</h4>
      {jobList.length > 0 ? <ul>

        {jobList.map((job) => (
          <li key={job.userJobId}>
            {job.title}
            {!job.Deadline && (
              <button onClick={() => handleJobComplete(job.jobId)}>Tamamla</button>
            )}
          </li>
        ))}
      </ul> :
        <h1>İşsiz</h1>
      }


    </div>
  );
};

export default BoardAdmin;