import Navbar from "../components/Navbar";
import LoginContainer from "./LoginContainer";
import { useInRouterContext, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import StoryComponent from "./StoryComponent";

const LandingContainer = ({ postNewPlayer}) => {


    const { activePlayer, setActivePlayer, allPlayers , newPlayer } = useContext(UserContext);



    return ( 

        <>
        <StoryComponent/>
        <LoginContainer postNewPlayer = {postNewPlayer}/>

        <h1> This is the landing page</h1>
        
        
        </>

     );
}
 
export default LandingContainer;