import { useState, useEffect } from "react";
import axios from "axios";
import "./Jobs.scss";
import { IJob } from "../../types/job.type";
import { baseUrl, deleteJobUrl } from "../../constants/url.constants";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../../types/user.type";
import AuthService from "../../services/auth.service";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../../components/CustomButton/CustomButton";
import { IUserJobs } from "../../types/userJobs.type";

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [userJobs, setUserJobs] = useState<IUserJobs[]>([]);
  const [user, setUser] = useState<IUser[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  useEffect(() => {
    fetchJobsList();
    fetchUserInfo();
    fetchUserJobs();
  }, []);

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      const response = await AuthService.getUserById(userId);
      setUser((prevlist) => [...prevlist, response]);
    };

    userJobs.forEach((uj) => fetchUser(uj.userId));
  }, [userJobs]);

  const fetchUserJobs = async () => {
    try {
      const ujresponse = await AuthService.getUserJobAll();

      setUserJobs(ujresponse);
    } catch (error) {
      alert("An Error Happened on fetching user jobs...");
    }
  };

  const fetchJobsList = async () => {
    try {
      const response = await axios.get(baseUrl);
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
      alert("An Error Happend on fetching...");
    }
  };

  const handleDeleteBtnClick = (id: number) => {
    axios
      .delete(`${deleteJobUrl}/${id}`)
      .then((response) =>
        redirect("/jobs", {
          state: { message: "Jobs Deleted Successfully" },
        })
      )
      .then(() => window.location.reload())
      .catch((error) => alert(error));
  };

  const redirectToEditPage = (id: number) => {
    redirect(`/jobs/edit/${id}`);
  };
  const redirectToAddPage = () => {
    redirect("/jobs/AddJobs");
  };

  const selectedJobs = async (id: number) => {
    const response = await AuthService.saveUserJob(currentUser?.id, id);

    if (response.name == "AxiosError") {
      Swal.fire({
        icon: "error",
        title: response.message,
      });
    } else if (
      response.responseData == "User already has this job" ||
      response.responseData == "This job is different with your department"
    ) {
      Swal.fire({
        icon: "error",
        title: response.responseData,
      });
    } else {
      redirect("/user", { state: { message: response.message } });
    }
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
                <th>Description</th>
                <th>Deadline</th>
                <th>Created</th>
                <th>Department</th>
                <th>Status</th>
                <th>Personel</th>
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

                  {job.departmentId === 1 ? (
                    <td>Yazılım</td>
                  ) : job.departmentId === 2 ? (
                    <td>Muhasebe</td>
                  ) : (
                    <td>İnsan Kaynakları</td>
                  )}
                  {job.status === false ? <td>Active</td> : <td>Completed</td>}
                  {userJobs
                    .filter((uj) => uj.jobId === job.jobId)
                    .map((uj, index) => {
                      const matchedUser = user.find(
                        (user) => user.id === uj.userId
                      );
                      return (
                        <td key={index}>
                          {matchedUser ? matchedUser.userName : ""}
                        </td>
                      );
                    })}
                  {userJobs.every((uj) => uj.jobId !== job.jobId) ? (
                    <td>
                    
                      <div style={{ color: "gray", fontStyle: "italic" }}>
                      
                        No Applicants
                      </div>
                    </td>
                  ) : null}
                  <td>
                    {currentUserRole[0] === "USER" &&
                    job.status === false &&
                    !user.some(
                      (u) =>
                        u.id ===
                        userJobs.find((uj) => uj.jobId === job.jobId)?.userId
                    ) ? (
                      <CustomButton
                        variant="select"
                        onClick={() => selectedJobs(job.jobId)}
                        text={""}
                      />
                    ) : currentUserRole[0] === "ADMIN" ? (
                      <>
                        <CustomButton
                          variant="edit"
                          onClick={() => redirectToEditPage(job.jobId)}
                          text={""}
                        />
                        <CustomButton
                          variant="delete"
                          onClick={() => handleDeleteBtnClick(job.jobId)}
                          text={""}
                        />
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentUserRole[0] === "ADMIN" ? (
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
          ) : null}
        </div>
      )}
    </div>
  );
};
export default Jobs;
