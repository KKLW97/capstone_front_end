import Navbar from "../components/Navbar";
import { Outlet} from "react-router-dom";

import "../CSSfiles/App.css";
import LeaderBoardComponent from "./LeaderBoardComponent";



const LandingContainer = () => {

    return ( 

        <>
            <Navbar />
            <Outlet/>
        {/* <LeaderBoardComponent/> */}


        {/* <LoginContainer postNewPlayer = {postNewPlayer}/> */}
 
        </>

     );
}
 
export default LandingContainer;