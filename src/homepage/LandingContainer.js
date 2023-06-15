import Navbar from "../components/Navbar";
import { Outlet} from "react-router-dom";


import LeaderBoardComponent from "./LeaderBoardComponent";



const LandingContainer = () => {

    return ( 

        <>

        <Navbar />
        <Outlet/>
   
        </>

     );
}
 
export default LandingContainer;