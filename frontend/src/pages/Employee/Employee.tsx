import { useState, useEffect } from "react";
import axios from "axios";
import "./Employee.scss";
import { deleteUserUrl } from "../../constants/url.constants";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../../types/user.type";
import AuthService from "../../services/auth.service";
import CustomTable from "../../components/EmployeeTable/EmployeeTable";

const Employee: React.FC = () => {
    const [Users, setUsers] = useState<IUser[]>([]);
    const location = useLocation();
    const redirect = useNavigate();

    const fetchUsersList = async () => {
        try {
            const response = await AuthService.getUsers();

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
            .delete(`${deleteUserUrl}${id}`)
            .then((response) =>
                redirect("/Users", {
                    state: { message: "Users Deleted Successfully" },
                })
            )
            .then(() => window.location.reload())
            .catch((error) => alert("Error"));
    };

    const redirectToEditPage = (id: string) => {
        console.log(id);

        redirect(`/users/edit/${id}`);
    };
    const redirectToAddPage = () => {
        redirect("/users/AddUsers");
    };

    console.log(Users);
    return (
        <div className="employee">
            <h1>Personnel List</h1>
            {Users.length < 0 ? (
                <h1>No Users</h1>
            ) : (
                <div className="table-wrapper">
                    <CustomTable
                        onDelete={handleDeleteBtnClick}
                        data={Users}
                        onAdd={redirectToAddPage}
                        onEdit={redirectToEditPage}
                    />
                </div>
            )}
        </div>
    );
};
export default Employee;
