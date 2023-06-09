import Navbar from "../components/Navbar";
import LoginContainer from "./LoginContainer";
import { useNavigate, Outlet } from "react-router-dom";

const LandingContainer = () => {
    return ( 

        <>
        <Outlet />
        <h1> This is the landing page</h1>

        
        
        </>

     );
}
 
export default LandingContainer;