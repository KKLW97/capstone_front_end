import Navbar from "../components/Navbar";
import { Outlet} from "react-router-dom";

import "../CSSfiles/App.css";
import "../CSSfiles/AudioButton.css"
import LeaderBoardComponent from "./LeaderBoardComponent";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import audioOn from "../assets/audio-on.png"
import audioMute from "../assets/mute.png"

const LandingContainer = () => {
    const {play, stop, isPlaying, setIsPlaying} = useContext(UserContext);

    const handleClickAudio = () => {setIsPlaying((prev) => !prev)}

    return ( 

        <>
        <div className="header">
            <div className="audio-image-container">
                {isPlaying ? <button onClick={handleClickAudio}><img className="audio-icon" src={audioOn} width={25} height={25}/></button> : <button onClick={handleClickAudio}><img className="audio-icon" src={audioMute} width={25} height={25}/></button>}
            </div>
            <div className="header-nav">
                <Navbar />
            </div>
        </div>
        <Outlet/>
        {/* <LeaderBoardComponent/> */}


        {/* <LoginContainer postNewPlayer = {postNewPlayer}/> */}

            
        </>

     );
}
 
export default LandingContainer;