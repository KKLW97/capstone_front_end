import Navbar from "../components/Navbar";
import { Outlet} from "react-router-dom";

import "../CSSfiles/App.css";
import LeaderBoardComponent from "./LeaderBoardComponent";

const LandingContainer = () => {

    return ( 

        <>

        <h1 className="title"> Art Heist </h1>
        <Navbar />
        <Outlet/>
        {/* <LeaderBoardComponent/> */}


        {/* <LoginContainer postNewPlayer = {postNewPlayer}/> */}

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