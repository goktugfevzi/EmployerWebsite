import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/AddJob/AddJob";
import EditJob from "./pages/EditJob/EditJob";
import Profile from "./pages/Profile/Profile";
import SignUp from "./Auth/Signup/Signup";
import Login from "./Auth/Login/Login";
import AuthService from "./services/auth.service";
import BroadUser from "./pages/BroadUser";
import BroadAdmin from "./pages/BroadAdmin";

const App: React.FC = () => {
   const [showModeratorBoard, setShowUserBoard] = useState(false);
   const [showAdminBoard, setShowAdminBoard] = useState(false);
   const [currentUser, setCurrentUser] = useState(undefined);

   useEffect(() => {
      const user = AuthService.getCurrentUser();
      const userRole = AuthService.getCurrentUserRole(user.id);
      
      if (user) {
         setCurrentUser(user);
         // setShowUserBoard(userRole =("USER"));
         // setShowAdminBoard(user.roles.includes("ADMIN"));
      }
      // EventBus.on("logout", () => {
      //    AuthService.logout();
      // });

      // return () => {
      //    EventBus.remove("logout");
      // };
   }, []);
   return (
      <div>
         <Navbar />

         {/* Wrapper */}
         <div className="wrapper">
            <Routes>
               <Route path={"/"} element={<Login />} />

               {(currentUser) ?
                  <Route path={"/"} element={<Home />} />

                  :
                  <Route path={"/"} element={<Login />} />}
               <Route path="/home" element={<Home />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/user" element={<BroadUser />} />
               <Route path="/admin" element={<BroadAdmin />} />
               <Route path="/login" element={<Login />} />

            </Routes>
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
         </div>
      </div >
   );
};
export default App;
