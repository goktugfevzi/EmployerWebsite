import React, { useEffect, useState } from "react";
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
      <div className="brand">IOTECH YAZILIM A.Ş.</div>
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
                {currentUserRole[0] === "USER" ? (
                  <Link to="/user">Profil</Link>
                ) : (
                  <Link to="/admin">Profil</Link>
                )}
              </li>
              <li onClick={toggleNavBar}>
                <Link to="/jobs">İş Takip</Link>
              </li>
              {currentUserRole[0] === "ADMIN" ? (
                <li onClick={toggleNavBar}>
                  <Link to="/users">Personel</Link>
                </li>
              ) : null}
              <li onClick={LogOuttoggleNavBar}>
                <Link to="/login">Çıkış</Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
