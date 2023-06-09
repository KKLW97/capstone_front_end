import { useState } from "react";
import ThiefComponent from "./ThiefComponent";
import PaintingComponent from "./PaintingComponent";
import mapImage from "../assets/mapPrototype2.png";

const MapContainer = ({containerWidth, containerHeight, displayMultipleChoiceQuestion, paintingPositionX, paintingPositionY}) => {
    const [thiefPositionX, setThiefPositionX] = useState(500);
    const [thiefPositionY, setThiefPositionY] = useState(500);
    const [thiefImage, setThiefImage] = useState("heading left");
    
    const theifSpeed = 5;

    const checkIfNearPainting = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPositionX, 2) + Math.pow(thiefPositionY - paintingPositionY, 2));
        if (distance <= proximityLimit) {
            displayMultipleChoiceQuestion();
          }
    }
    // 0, 43, 85, 128, 
    const moveRight = () => {
        if((thiefPositionX <= 495)){
            if(thiefPositionY >= 495){
                if(thiefPositionX >= 450){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
                if(thiefPositionX <= 310){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
            }
            if(thiefPositionY >= 315 && thiefPositionY <= 490){
                if(thiefPositionX >= 450){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
                if(thiefPositionX <= 85){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
            }
            if(thiefPositionY >= 265 && thiefPositionY <= 315){
                setThiefPositionX(thiefPositionX + theifSpeed);
                // setThiefImage("heading right");
            }
            if(thiefPositionY >= 90 && thiefPositionY <= 265){
                if(thiefPositionX >= 90 && thiefPositionX <= 160){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
                if(thiefPositionX >= 400 && thiefPositionX <= 530){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
            }
            if(thiefPositionY >= 40 && thiefPositionY <= 90){
                setThiefPositionX(thiefPositionX + theifSpeed);
                // setThiefImage("heading right");
            }
            if(thiefPositionY > 0 && thiefPositionY <= 40){
                if(thiefPositionX >= 90 && thiefPositionX <= 160){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                    // setThiefImage("heading right");
                }
            }
        }
    }
    const moveLeft = () => {
        if(thiefPositionX >= 45){
            if(thiefPositionY >= 490){
                if(thiefPositionX >= 460 && thiefPositionX <= 530){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
                if(thiefPositionX <= 320){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
            }
            if(thiefPositionY >= 315 && thiefPositionY <= 490){
                if(thiefPositionX >= 460){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
                if(thiefPositionX <= 100){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
            }
            if(thiefPositionY >= 265 && thiefPositionY <= 315){
                setThiefPositionX(thiefPositionX - theifSpeed);
                // setThiefImage("heading left");
            }
            if(thiefPositionY >= 90 && thiefPositionY <= 265){
                if(thiefPositionX >= 460){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
                if(thiefPositionX >= 120 && thiefPositionX <= 200){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
            }
            if(thiefPositionY >= 40 && thiefPositionY <= 90){
                setThiefPositionX(thiefPositionX - theifSpeed);
                // setThiefImage("heading left");
            }
            if(thiefPositionY > 0 && thiefPositionY <= 40){
                if(thiefPositionX >= 120 && thiefPositionX <= 200){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                    // setThiefImage("heading left");
                }
            }
        }
    }
    const moveDown = () => {
        if((thiefPositionX >= 455 && thiefPositionX <= 600 && thiefPositionY <= 530)){
            setThiefPositionY(thiefPositionY + theifSpeed);
        }
        if(thiefPositionX >= 160 && thiefPositionX <= 455){
            if(thiefPositionY <= 80){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
            if(thiefPositionY <= 310 && thiefPositionY >= 100){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
            if(thiefPositionY <= 530 && thiefPositionY >= 400){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
        }
        if((thiefPositionX >= 120 && thiefPositionX <= 160)){
            if(thiefPositionY <= 310){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
            if(thiefPositionY <= 530 && thiefPositionY >= 400){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
        }
        if((thiefPositionX >= 90 && thiefPositionX <= 120)){
            if(thiefPositionY >= 530){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
        }
        if(thiefPositionX >= 45 && thiefPositionX <= 90){
            if(thiefPositionY <= 80){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
            if(thiefPositionY <= 530 && thiefPositionY >= 100){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
        }
    }
    const moveUp = () => {
        if((thiefPositionX >= 455 && thiefPositionX <= 600)){
            if(thiefPositionY >= 45){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
        }
        if(thiefPositionX >= 160 && thiefPositionX <= 455){
            if(thiefPositionY >= 45 && thiefPositionY <= 110){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
            if(thiefPositionY >= 268 && thiefPositionY <= 400){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
            if(thiefPositionY >= 490){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
        }
        if((thiefPositionX >= 120 && thiefPositionX <= 160)){
            if(thiefPositionY >= 10 && thiefPositionY <= 350)setThiefPositionY(thiefPositionY - theifSpeed);
            
            if(thiefPositionY >= 490 && thiefPositionY <= 600){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
        }
        if((thiefPositionX >= 90 && thiefPositionX <= 120)){
            if(thiefPositionY >= 10 && thiefPositionY <= 350){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
            if(thiefPositionY >= 490 && thiefPositionY <= 600){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
        }
        if(thiefPositionX >= 45 && thiefPositionX <= 90){
            if(thiefPositionY >= 45 && thiefPositionY <= 150){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
            if(thiefPositionY >= 270){
                setThiefPositionY(thiefPositionY - theifSpeed);
            }
        }
    }

    window.onkeydown = function(e){
        if(e.code === 'ArrowRight'){
            e.preventDefault();
            moveRight();
        }
        if(e.code === 'ArrowLeft'){
            e.preventDefault();
            moveLeft();
        }
        if(e.code === 'ArrowDown'){
            e.preventDefault();
            moveDown();
        }
        if(e.code === 'ArrowUp'){
            e.preventDefault();
            moveUp();
        }
        checkIfNearPainting();
    }
    return ( 
        <div className="map-container" style={{height: `${containerHeight}px`, width: `${containerWidth}px`, backgroundImage: `url(${mapImage})`, backgroundSize: `${containerWidth}px`, backgroundColor: `#171717`}}>
            {/* <h3> This is the MapContainer </h3> */}
            <ThiefComponent containerHeight={containerHeight} containerWidth={containerWidth} thiefPositionX={thiefPositionX} thiefPositionY={thiefPositionY} thiefImage={thiefImage}/>
            <PaintingComponent containerHeight={containerHeight} containerWidth={containerWidth} paintingPositionX={paintingPositionX} paintingPositionY={paintingPositionY} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion}></PaintingComponent>
        </div>
     );
}
 
export default MapContainer;