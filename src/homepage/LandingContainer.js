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
        </>

     );
}
 
export default LandingContainer;