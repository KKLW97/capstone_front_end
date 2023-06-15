import Navbar from "../components/Navbar";
import LoginContainer from "./LoginContainer";
import { useInRouterContext, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const LandingContainer = ({ postNewPlayer}) => {


    const { activePlayer, setActivePlayer, allPlayers , newPlayer } = useContext(UserContext);



    return ( 

        <>

        <LoginContainer postNewPlayer = {postNewPlayer}/>

        <h1> This is the landing page</h1>
        
        <div className="footer">
            <ul className="footer-nav-list">
                <li className="">
                <div className="nav-text">
                <a href="http://localhost:3000" className="#">Home</a></div>
                </li>
                <li className="">
                <div className="nav-text">
                <a href="http://localhost:3000/playerAccount" className="#">Account</a></div>
                </li>
                <li className="">
                <div className="nav-text">
                <a href="http://localhost:3000/gamePage" className="#">Game</a></div>
                </li>
            </ul>
        </div>
            
        </>

     );
}
 
export default LandingContainer;