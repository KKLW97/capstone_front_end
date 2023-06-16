// import blob2 from '../assets/blob2.png';
import thief_sprite_right from '../assets/thief_sprite_right.png';
import thief_sprite_left from '../assets/thief_sprite_left.png';
import thief_sprite_front from '../assets/thief_sprite_front.png';
import thief_sprite_back from '../assets/thief_sprite_back.png';
import cat from '../assets/cat.GIF';
import { useState, useEffect } from 'react';


const ThiefComponent = ({speechBubble, displayPaintingInfoStatus, displayCurrentQuestion, paintingInfo, containerHeight, containerWidth, thiefPositionX, thiefPositionY, thiefImage, questionBeingDisplayed, setQuestionModal}) => {


    const handleClick = () => {
        setQuestionModal(true);
    }

    useEffect(()=>{
        const handleKeyDown = (e) => {
            if (e.code === 'Space'){
                e.preventDefault();
                setQuestionModal(true);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    },[])


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
            {thiefImage === "heading right" ? <img src={thief_sprite_right} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : thiefImage === "heading left" ? <img src={thief_sprite_left} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : thiefImage === "heading up" ? <img src={thief_sprite_back} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
            : <img src={thief_sprite_front} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/>}
            
         
            {paintingInfo ? <button onClick={handleClick} style={{visibility: `${displayPaintingInfoStatus}`, width: "200px", position: "absolute", left: "-55px", bottom: "70px", color: "black", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "10px", border: "2px solid black"}}>{paintingInfo}</button> : null}

            {speechBubble ? <div style={{zIndex: "2", position: "absolute", left: "10px", bottom: "50px", padding: "10px"}}>{speechBubble}</div> : null}



        </div>
      );
}
 
export default ThiefComponent;









