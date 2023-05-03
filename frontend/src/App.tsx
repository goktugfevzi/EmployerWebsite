import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/AddJob/AddJob";
import EditJob from "./pages/EditJob/EditJob";
import SignUp from "./Auth/Signup/Signup";
import Login from "./Auth/Login/Login";
import AuthService from "./services/auth.service";
import BroadUser from "./pages/Profile/BroadUser";
import BroadAdmin from "./pages/Profile/BroadAdmin";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Employee from "./pages/Employee/Employee";
import AddEmployee from "./pages/AddEmployee/AddEmployee";


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
      // window.location.reload();
      fetchData();
   }, []);

   return (
      <div>
         <Navbar />

         {/* Wrapper */}
         <div className="wrapper">


            {currentUser ?
               <Routes>
                  {currentUserRole==="USER"?
                  <Route path="/" element={<BroadUser />} />
                  :
                  <Route path="/" element={<BroadAdmin />} />

                  }
                  <Route path="/home" element={<Home />} />
                  <Route path="/admin" element={<BroadAdmin />} />
                  <Route path="/user" element={<BroadUser />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/AddJobs" element={<AddJob />} />
                  <Route path="/jobs/Edit/:id" element={<EditJob />} />
                  <Route path="/users" element={<Employee />} />
                  <Route path="/users/Addusers" element={<AddEmployee />} />
                  <Route path="/users/Edit/:id" element={<EditJob />} />
               </Routes>
               :
               <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/admin" element={<BroadAdmin />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/AddJobs" element={<AddJob />} />
                  <Route path="/jobs/Edit/:id" element={<EditJob />} />
                  <Route path="/users" element={<Employee />} />

               </Routes>

            }







         </div>
      </div >


   );
};
export default App;





// {currentUser ? (
//    <Routes>
//       <Route path="/" element={<Navigate to="/home" />} />
//       <Route path="/admin" element={<BroadAdmin />} />
//       <Route path="/user" element={<BroadUser />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/login" element={<Navigate to="/home" />} />
//    </Routes>
// ) : (
//    <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />
//    </Routes>
// )}
{/* {currentUserRole[0]==="ADMIN" && <Route path="/admin" element={<BroadAdmin />} />}
                  {currentUserRole[0]==="USER" && <Route path="/user" element={<BroadUser />} />}
{/* <Router>
<div>
  <Switch>
    <Route exact path="/" render={() => (currentUser ? <Redirect to="/user" /> : <LoginForm />)} />
    <Route exact path="/signup" render={() => (currentUser ? <Redirect to="/" /> : <SignupForm />)} />
    <Route
      exact
      path="/admin"
      render={() => (currentUser && currentUser.roles.includes("ROLE_ADMIN") ? <BoardAdmin logOut={logOut} /> : <Redirect to="/" />)}
    />
    <Route exact path="/user" render={() => (currentUser ? <BoardUser logOut={logOut} /> : <Redirect to="/" />)} />
  </Switch>
</div>
</Router> */}

{/* <Route index element={<Jobs />} />
      <Route path="AddJobs" element={<AddJob />} />
      <Route path="Edit/:id" element={<EditJob />} />
</Route> */}
{/* <div className="container mt-3">
   <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/home"} element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/user" element={<BoardUser />} />
      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/admin" element={<BoardAdmin />} />
   </Routes>
</div> */}