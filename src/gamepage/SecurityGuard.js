import security_guards_right from '../assets/security_guards_right.png';
import security_guards_left from '../assets/security_guards_left.png';
import security_guards_front from '../assets/security_guards_front.png';
import security_guards_back from '../assets/security_guards_back.png';


const SecurityGuard = ({guardSpeechBubble, securityGuardImage, securityGuardPositionX, securityGuardPositionY}) => {
   


    return (
      <div
        className="sprite boat-sprite"
        style={{
            height: "70px",
            width: "70px",
            display: "flex",
            position: "absolute",
            left: `${securityGuardPositionX}px`,
            top: `${securityGuardPositionY}px`,
            }}
        >
            {securityGuardImage === "heading right" ? <img src={security_guards_right} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : securityGuardImage === "heading left" ? <img src={security_guards_left} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : securityGuardImage === "heading up" ? <img src={security_guards_back} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
            : <img src={security_guards_front} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/>}
            {guardSpeechBubble ? <div style={{position: "absolute", left: "10px", bottom: "50px", padding: "10px"}}>{guardSpeechBubble}</div> : null}
            

        </div>
      );
}
 
export default SecurityGuard;