import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/AddJob/AddJob";
import EditJob from "./pages/EditJob/EditJob";
import SignUp from "./pages/Auth/Signup/Signup";
import Login from "./pages/Auth/Login/Login";
import AuthService from "./services/auth.service";
import UserPanel from "./pages/Profile/UserPanel";
import AdminPanel from "./pages/Profile/AdminPanel";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Employee from "./pages/Employee/Employee";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserRole, setCurrentUserRole] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const user = AuthService.getCurrentUser();
            if (user) {
                setCurrentUser(user);
                const userRole = await AuthService.getCurrentUserRole(user.id);
                setCurrentUserRole(userRole);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />

            {/* Wrapper */}
            <div className="wrapper">
                {currentUser ? (
                    <Routes>
                        {currentUserRole === "USER" ? (
                            <Route path="/" element={<UserPanel />} />
                        ) : (
                            <Route path="/" element={<AdminPanel />} />
                        )}
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/user" element={<UserPanel />} />
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/AddJobs" element={<AddJob />} />
                        <Route path="/jobs/Edit/:id" element={<EditJob />} />
                        <Route path="/users" element={<Employee />} />
                        <Route
                            path="/users/Addusers"
                            element={<AddEmployee />}
                        />
                        <Route
                            path="/users/Edit/:id"
                            element={<EditEmployee />}
                        />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                )}
            </div>
        </div>
    );
};
export default App;
