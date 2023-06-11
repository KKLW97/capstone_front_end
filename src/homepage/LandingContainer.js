import Navbar from "../components/Navbar";
import LoginContainer from "./LoginContainer";
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const LandingContainer = () => {




    return ( 

        <>
        <Outlet />
        <h1> This is the landing page</h1>
    
        </>

     );
}
 
export default LandingContainer;