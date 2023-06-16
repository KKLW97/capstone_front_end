import Navbar from "../components/Navbar";
import { Outlet} from "react-router-dom";


import LeaderBoardComponent from "./LeaderBoardComponent";


// footer image imports
import github from "../assets/github.png"
import instagram from "../assets/instagram.png"
import linkedin from "../assets/linkedin.png"
import twitter from "../assets/twitter.png"
import twitch from "../assets/twitch.png"

const LandingContainer = () => {
    const year = new Date().getFullYear();

    return ( 
        <>
            

            <Navbar />
            <Outlet/>
            <div className="footer">
            <div className="footer-left">
                <h2 className="footer-headers">Useful Links:</h2>
                <div className="footer-nav-list">
                    <Navbar className="footer-nav" />
                </div>
            </div>
            <div className="footer-right">
                <h2 className="footer-headers">Connect With Us</h2>
                <div className="footer-right-images">
                    <img className="social-icons" src={github} width={50} height={50}/>
                    <img className="social-icons" src={twitch} width={50} height={50}/>
                    <img className="social-icons" src={twitter} width={50} height={50}/>
                    <img className="social-icons" src={linkedin} width={50} height={50}/>
                    <img className="social-icons" src={instagram} width={50} height={50}/>
                </div>
            </div>
            <div className="footer-bottom">
              <h5 className="footer-copyright">{`Copyright © The Gallery Bandits ${year}`}</h5>
            </div>
        </div>
       

        </>
    );
}
 
export default LandingContainer;