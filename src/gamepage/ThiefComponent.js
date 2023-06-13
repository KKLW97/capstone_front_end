// import blob2 from '../assets/blob2.png';
import thief_sprite_right from '../assets/thief_sprite_right.png';
import thief_sprite_left from '../assets/thief_sprite_left.png';
import thief_sprite_front from '../assets/thief_sprite_front.png';
import thief_sprite_back from '../assets/thief_sprite_back.png';
import QuestionModal from './QuestionModal';
import { useState } from 'react';

const ThiefComponent = ({displayPaintingInfoStatus, displayCurrentQuestion, paintingInfo, containerHeight, containerWidth, thiefPositionX, thiefPositionY, thiefImage, questionBeingDisplayed}) => {

    const [questionModal, setQuestionModal] = useState(false);

    const handleClick = () => {
        // displayCurrentQuestion();

    }


    return (
      <div
        className="sprite boat-sprite"
        style={{
            height: "70px",
            width: "70px",
            display: "flex",
            position: "absolute",
            left: `${thiefPositionX}px`,
            top: `${thiefPositionY}px`,
            }}
        >
            {/* <img src={blob2}/> */}
            {thiefImage === "heading right" ? <img src={thief_sprite_right} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : thiefImage === "heading left" ? <img src={thief_sprite_left} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : thiefImage === "heading up" ? <img src={thief_sprite_back} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
            : <img src={thief_sprite_front} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/>}
            
           {/* SET STATE FOR DISPLAY STATUS, if sprite is near painting, setDisplayStatus("visible"), else setDisplayStatus("hidden")*/}
           {/* add inline style to button : visibility:`${displayStatus}`} */}
            {paintingInfo ? <button onClick={() => {setQuestionModal(true)}} style={{visibility: `${displayPaintingInfoStatus}`, width: "200px", position: "absolute", left: "-55px", bottom: "70px", color: "black", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "10px", border: "2px solid black"}}>{paintingInfo}</button> : null}
            {/* {paintingInfo ? <button onClick={handleClick} style={{width: "200px", position: "absolute", left: "-55px", bottom: "70px", color: "black", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "10px", border: "2px solid black"}}>{paintingInfo}</button> : null} */}
            
            {questionModal && <QuestionModal closeModal={setQuestionModal} questionBeingDisplayed={questionBeingDisplayed} />} 

        </div>
      );
}
 
export default ThiefComponent;








