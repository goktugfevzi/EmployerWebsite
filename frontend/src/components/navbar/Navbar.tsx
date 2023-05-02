import React, { useEffect, useState } from 'react'
import "./navbar.scss";
import { Menu, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Navbar: React.FC = () => {
   const [open, setOpen] = useState<boolean>(false);
   const [currentUser, setCurrentUser] = useState(undefined);
   const [currentUserRole, setCurrentUserRole] = useState("");

   const toggleNavBar = () => {
      if (window.innerWidth < 500) {
         setOpen(!open);
      }
   };

   const LogOuttoggleNavBar = () => {
      const code = AuthService.logout();
      console.log(code);
      if (window.innerWidth < 500) {
         setOpen(!open);
      }
      window.location.reload();

   };
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


   const menuStyle = open ? "menu open" : "menu";
   console.log(currentUser);
   return (
      <div className="navbar">
         <div className="brand">Discover Your Dream</div>
         <div className="hamburger">
            <Menu onClick={toggleNavBar} />
         </div>
         <div className={menuStyle}>
            <ul>
               <Close className="close" onClick={toggleNavBar} />
               {/* <li onClick={toggleNavBar}>
                  <Link to="/home">Home</Link>
               </li> */}
               {currentUser ? (
                  <>
                     <li onClick={toggleNavBar}>
                        {currentUserRole==="USER"?
                        <Link to="/user">Profil</Link>
                        :
                        <Link to="/admin">Profil</Link>
                        }
                     </li>
                     <li onClick={toggleNavBar}></li>
                     <Link to="/jobs">İş Takip</Link>
                     {currentUserRole[0] === "ADMIN" ? <li onClick={toggleNavBar}>
                        <Link to="jobs/AddJobs">Staff</Link>
                     </li> : null}
                     <li onClick={LogOuttoggleNavBar}>
                        <Link to="/login">Log Out</Link>
                     </li>
                  </>
               ) : (null)}
            </ul>
         </div>
      </div>
   );
};
// {/* {currentUserRole[0]==="ADMIN" && <Route path="/admin" element={<BroadAdmin />} />}
//                   {currentUserRole[0]==="USER" && <Route path="/user" element={<BroadUser />} />}
export default Navbar;

