import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/AddJob/AddJob";
import EditJob from "./pages/EditJob/EditJob";
import DeleteJob from "./pages/DeleteJob/DeleteJob";
import Profile from "./pages/Profile/Profile";
import SignUp from "./Auth/Signup/Signup";

const App: React.FC = () => {
   return (
      <div>
         <Navbar />

         {/* Wrapper */}
         <div className="wrapper">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="Signup" element={<SignUp />}/>
               <Route path="Profile" element={<Profile/>} />
               <Route path="/Jobs">
                  <Route index element={<Jobs />} />
                  <Route path="AddJobs" element={<AddJob />} />
                  <Route path="Edit/:id" element={<EditJob />} />
                  <Route path="Delete/:id" element={<DeleteJob />} />
               </Route>
            </Routes>
         </div>
      </div>
   );
};
export default App;
