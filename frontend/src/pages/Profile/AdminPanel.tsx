import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { IUser } from "../../types/user.type";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";
import CustomButton from "../../components/CustomButton/CustomButton";

const AdminPanel: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const location = useLocation();
    const redirect = useNavigate();
    // const handleLoginClick = () => {
    //     const clientId = "6ad459a7e5c7dc6d7e49af3258d8a9927e88c8315d087724e9886274a3fadf7b";
    //     const redirectUri = "http://localhost:3000/gitlab";
    //     const authorizationUrl = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    //     window.location.href = authorizationUrl;
    // };
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
            {/* <div>
                <button onClick={handleLoginClick}>Login with GitLab</button>
            </div> */}
        </div>
    );
};

export default AdminPanel;
