import { useState, useEffect } from "react";
import axios from "axios";
import "./Employee.scss";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteJobUrl } from "../../constants/url.constants";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../../types/user.type";
import AuthService from "../../services/auth.service";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const Employee: React.FC = () => {
        const [Users, setUsers] = useState<IUser[]>([]);
        const location = useLocation();
        const redirect = useNavigate();

        const fetchUsersList = async () => {
                try {
                        const response = await AuthService.getUsers();
                        console.log(response);
                        setUsers(response);
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
                fetchUsersList();
                setTimeout(() => {
                        document.location.reload();
                }, 300000000);
        }, []);

        const handleDeleteBtnClick = (id: string) => {
                console.log(id);
                axios
                        .delete(`${deleteJobUrl}/${id}`)
                        .then((response) => redirect("/Users", { state: { message: "Users Deleted Successfully" } }))
                        .then(() => window.location.reload())
                        .catch((error) => alert("Error"));
        };

        const redirectToEditPage = (id: string) => {
                console.log(id);

                redirect(`/Users/edit/${id}`);
        };
        const redirectToAddPage = () => {
                redirect("/Users/AddUsers");
        };

        // const selectedUsers = async (id: number) => {
        //         const response = await AuthService.saveUserJob(currentUser?.id, id);
        //         if (response.name == "AxiosError") {
        //                 console.log(response.message);
        //                 Swal.fire({
        //                         icon: "error",
        //                         title: response.message,
        //                 });
        //         }
        //         else {
        //                 console.log(response.message);
        //                 redirect("/admin", { state: { message: response.message } });
        //         }
        // }
        console.log(Users);
        return (
                <div className="employee">
                        <h1>Users List</h1>
                        {Users.length < 0 ? (
                                <h1>No Users</h1>
                        ) : (
                                <div className="table-wrapper">
                                        <table>
                                                <thead>
                                                        <tr>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Email Confirmed</th>
                                                                <th>Department</th>
                                                                <th>process</th>
                                                        </tr>
                                                </thead>
                                                <tbody>

                                                        {Users.map((user) => (
                                                                <tr key={user.id}>
                                                                        <td>{user.userName}</td>
                                                                        <td>{user.email}</td>
                                                                        <td>{user.emailConfirmed=="false"?<td>No</td>:<td>Yes</td>}</td>
                                                                        {user.departmentId === "1" ? <td>Muhasebe</td> : user.departmentId === "2" ? <td>Yazılım</td> : <td>İnsan Kaynakları</td>}
                                                                        <td>


                                                                                {/* <Button variant="contained"
                                                                                        color="warning"
                                                                                        sx={{ mx: 3 }}
                                                                                        onClick={() => selectedUsers(user.id)}
                                                                                ></Button> */}
                                                                                 <><Button
                                                                                        variant="contained"
                                                                                        color="warning"
                                                                                        sx={{ mx: 3 }}
                                                                                        onClick={() => redirectToEditPage(user.id)}
                                                                                >
                                                                                        <Edit />
                                                                                </Button><Button
                                                                                        variant="contained"
                                                                                        color="error"
                                                                                        sx={{ mx: 3 }}
                                                                                        onClick={() => handleDeleteBtnClick(user.id)}
                                                                                >
                                                                                                <Delete />
                                                                                        </Button></>

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
export default Employee;