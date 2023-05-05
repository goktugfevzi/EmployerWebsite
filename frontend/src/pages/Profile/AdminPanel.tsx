import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { IUser } from "../../types/user.type";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";
import CustomButton from "../../components/CustomButton/CustomButton";

const AdminPanel: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [departmentName, setDepartmentName] = useState("");
    const location = useLocation();
    const redirect = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const user = AuthService.getCurrentUser();
            if (user) {
                setUser(user);
                if (location?.state) {
                    Swal.fire({
                        icon: "success",
                        title: location?.state?.message,
                    });
                    redirect(location.pathname, { replace: true });
                }
                setDepartmentName(
                    user.departmentId === 1
                        ? "Yazılım"
                        : user.departmentId === 2
                        ? "Muhasebe"
                        : "Insan Kaynaklari"
                );
            }
        };
        fetchData();
    }, []);

    const handlePasswordReset = () => {
        redirect(`/change-password`);
    };
    return (
        <div className="Profile">
            <h1>ADMIN</h1>
            <h3>Name : {user?.userName}</h3>
            <h3>Mail : {user?.email}</h3>
            <CustomButton
                variant="edit"
                text="Şifre Yenile"
                onClick={() => handlePasswordReset}
            />
        </div>
    );
};

export default AdminPanel;
