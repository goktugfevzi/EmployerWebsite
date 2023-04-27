import "./Home.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import photo from "../../assets/images/image.jpg";

const Home = () => {
   const redirect = useNavigate();
   return (
      <div className="home">
         <h1>Welcome to Your Dream Jobs</h1>
         <Button variant="outlined" color="primary" onClick={() => redirect("/Jobs")}>
            Jobs List
         </Button>
         <img src={photo} alt="React Image" ></img>
      </div>
   );
};

export default Home;