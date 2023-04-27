import "./navbar.scss";
import { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
   const [open, setOpen] = useState<boolean>(false);

   const toggleNavBar = () => {
      if (window.innerWidth < 500) {
         setOpen(!open);
      }
   };

   const menuStyle = open ? "menu open" : "menu";

   return (
      <div className="navbar">
         <div className="brand">Discover Your Dream</div>
         <div className="hamburger">
            <Menu onClick={toggleNavBar} />
         </div>
         <div className={menuStyle}>
            <ul>
               <Close className="close" onClick={toggleNavBar} />
               <li onClick={toggleNavBar}>
                  <Link to="/">Home</Link>
               </li>
               <li onClick={toggleNavBar}>
                  <Link to="/Profile">Profile</Link>
               </li>
               <li onClick={toggleNavBar}>
                  <Link to="/Jobs">Tasks</Link>
               </li>
               <li onClick={toggleNavBar}>
                  <Link to="Jobs/AddJobs">Staff</Link>
               </li>
               <li onClick={toggleNavBar}>
                  <Link to="Jobs/AddJobs">Log Out</Link>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Navbar;