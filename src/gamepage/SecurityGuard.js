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
            {/* <img src={blob2}/> */}
            {securityGuardImage === "heading right" ? <img src={security_guards_right} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : securityGuardImage === "heading left" ? <img src={security_guards_left} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : securityGuardImage === "heading up" ? <img src={security_guards_back} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
            : <img src={security_guards_front} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/>}
            
           {/* SET STATE FOR DISPLAY STATUS, if sprite is near painting, setDisplayStatus("visible"), else setDisplayStatus("hidden")*/}
           {/* add inline style to button : visibility:`${displayStatus}`} */}
            {/* {paintingInfo ? <button onClick={() => {setQuestionModal(true)}} style={{visibility: `${displayPaintingInfoStatus}`, width: "200px", position: "absolute", left: "-55px", bottom: "70px", color: "black", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "10px", border: "2px solid black"}}>{paintingInfo}</button> : null} */}
            {guardSpeechBubble ? <div style={{position: "absolute", left: "10px", bottom: "50px", padding: "10px"}}>{guardSpeechBubble}</div> : null}
            
            {/* {questionModal && <QuestionModal closeModal={setQuestionModal} questionBeingDisplayed={questionBeingDisplayed} />}  */}

        </div>
      );
}
 
export default SecurityGuard;