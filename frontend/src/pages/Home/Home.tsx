import React, { useState } from 'react'
import "./Home.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import photo from "../../assets/images/image.jpg";
import AuthService from "../../services/auth.service";

const Home = () => {
   const redirect = useNavigate();
  const user = AuthService.getCurrentUser();
  
   return (
      <div className="home">
         <h1>Welcome
            to Your Dream Jobs----
            {user.email}{user.userName}
         </h1>
         <Button variant="outlined" color="primary" onClick={() => redirect("/Jobs")}>
            Jobs List
         </Button>
         <img src={photo} alt="React Image" ></img>
      </div>
   );
};

export default Home;


