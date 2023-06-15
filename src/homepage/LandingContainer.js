import Navbar from "../components/Navbar";
import LoginContainer from "./LoginContainer";
import { Outlet, useInRouterContext, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const LandingContainer = ({ postNewPlayer}) => {


    const { activePlayer, setActivePlayer, allPlayers , newPlayer } = useContext(UserContext);



    return ( 

        <>
        <h1> This is the landing page</h1>
        <Navbar />
        <Outlet/>
        </>

     );
}
 
export default LandingContainer;