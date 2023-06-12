import { useState } from "react";
import ThiefComponent from "./ThiefComponent";
import PaintingComponent from "./PaintingComponent";
import mapImage from "../assets/unnamed-1.png";

const MapContainer = ({containerWidth, containerHeight, displayMultipleChoiceQuestion, paintingPositionX, paintingPositionY}) => {
    const [paintingPosition1X, setPaintingPosition1X] = useState(150);
    const [paintingPosition1Y, setPaintingPosition1Y] = useState(40);    
    const [paintingPosition2X, setPaintingPosition2X] = useState(790);
    const [paintingPosition2Y, setPaintingPosition2Y] = useState(40);    
    const [paintingPosition3X, setPaintingPosition3X] = useState(190);
    const [paintingPosition3Y, setPaintingPosition3Y] = useState(720);    
    const [paintingPosition4X, setPaintingPosition4X] = useState(750);
    const [paintingPosition4Y, setPaintingPosition4Y] = useState(720); 


    const [thiefPositionX, setThiefPositionX] = useState(480);
    const [thiefPositionY, setThiefPositionY] = useState(0);
    const [thiefImage, setThiefImage] = useState("heading down");
    
    const theifSpeed = 5;

    const checkIfNearPainting1 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition1X, 2) + Math.pow(thiefPositionY - paintingPosition1Y, 2));
        if (distance <= proximityLimit) {
            displayMultipleChoiceQuestion(0);
          }
    }

    const checkIfNearPainting2 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition2X, 2) + Math.pow(thiefPositionY - paintingPosition2Y, 2));
        if (distance <= proximityLimit) {
            displayMultipleChoiceQuestion(1);
          }
    }
    const checkIfNearPainting3 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition3X, 2) + Math.pow(thiefPositionY - paintingPosition3Y, 2));
        if (distance <= proximityLimit) {
            displayMultipleChoiceQuestion(2);
          }
    }
    const checkIfNearPainting4 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition4X, 2) + Math.pow(thiefPositionY - paintingPosition4Y, 2));
        if (distance <= proximityLimit) {
            displayMultipleChoiceQuestion(3);
          }
    }

    const moveRight = () => {
        setThiefImage("heading right");
        if(thiefPositionX <= 1000){
            if(thiefPositionY <= 200){
                if(thiefPositionX <= 920 && thiefPositionX >= 600){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
                if(thiefPositionX <= 560 && thiefPositionX >= 350){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
                if(thiefPositionX <= 275){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
            }
            if(thiefPositionY <= 450 && thiefPositionY > 200){
                setThiefPositionX(thiefPositionX + theifSpeed);
            }
            if(thiefPositionY <= 635 && thiefPositionY > 450){
                if(thiefPositionX <= 840 && thiefPositionX >= 600){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
                if(thiefPositionX <= 560 && thiefPositionX >= 350){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
                if(thiefPositionX <= 205){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
            }
            if(thiefPositionY <= 690 && thiefPositionY > 635){
                if(thiefPositionX <= 840){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
            }
            if(thiefPositionY > 690){
                if(thiefPositionX <= 600){
                    setThiefPositionX(thiefPositionX + theifSpeed);
                }
            }
        }
    }
    const moveLeft = () => {
        setThiefImage("heading left");
        if(thiefPositionX >= 0){
            if(thiefPositionY <= 200){
                if(thiefPositionX >= 690 && thiefPositionX <= 1000){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
                if(thiefPositionX >= 405 && thiefPositionX <= 600){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
                if(thiefPositionX >= 45 && thiefPositionX <= 395){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
            }
            if(thiefPositionY <= 450 && thiefPositionY > 200){
                setThiefPositionX(thiefPositionX - theifSpeed);
            }
            if(thiefPositionY <= 635 && thiefPositionY > 450){
                if(thiefPositionX >= 770){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
                if(thiefPositionX <= 600 && thiefPositionX >= 405){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
                if(thiefPositionX <= 210 && thiefPositionX >= 125){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
            }
            if(thiefPositionY <= 690 && thiefPositionY > 635){
                if(thiefPositionX >= 125){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
            }
            if(thiefPositionY > 690){
                if(thiefPositionX >= 370){
                    setThiefPositionX(thiefPositionX - theifSpeed);
                }
            }
        }
    }
    const moveDown = () => {
        setThiefImage("heading down");
        if((thiefPositionY <= 725)){
            if((thiefPositionX <= 120 || (thiefPositionX <= 395 && thiefPositionX >= 210) || (thiefPositionX <= 760 && thiefPositionX >= 570) || (thiefPositionX >= 850))){
                if(thiefPositionY <= 445){
                    setThiefPositionY(thiefPositionY + theifSpeed);
                }
                if(thiefPositionY > 500 && thiefPositionY <= 685){
                    setThiefPositionY(thiefPositionY + theifSpeed);
                }
            }
            if(thiefPositionY <= 685 && (thiefPositionX > 120 && thiefPositionX < 210)|| (thiefPositionX > 395 && thiefPositionX < 570) || (thiefPositionX > 760 && thiefPositionX < 850)){
                    setThiefPositionY(thiefPositionY + theifSpeed);
            }
            if((thiefPositionX <= 395 && thiefPositionX >= 360) || (thiefPositionX <= 610 && thiefPositionX >= 570)){
                setThiefPositionY(thiefPositionY + theifSpeed);
            }
        }
    }
    const moveUp = () => {
        setThiefImage("heading up");
        if(thiefPositionY >= 0){
            if(thiefPositionX <= 35 || thiefPositionX >= 935){
                if(thiefPositionY >= 205){
                    setThiefPositionY(thiefPositionY - theifSpeed);
                }
            }
            if((thiefPositionX > 35 && thiefPositionX <= 210) || (thiefPositionX >= 765 && thiefPositionX < 935)){
                if(thiefPositionY >= 45){
                    setThiefPositionY(thiefPositionY - theifSpeed);
                }
            }
            if((thiefPositionX > 210 && thiefPositionX <= 290) || (thiefPositionX >= 675 && thiefPositionX < 765)){
                if(thiefPositionY >= 45 && thiefPositionY < 600){
                    setThiefPositionY(thiefPositionY - theifSpeed);
                }
                if(thiefPositionY >= 640){
                    setThiefPositionY(thiefPositionY - theifSpeed);
                }
            }
            if((thiefPositionX > 290 && thiefPositionX <= 395) || (thiefPositionX >= 570 && thiefPositionX < 675)){
                if(thiefPositionY >= 205 && thiefPositionY < 460){
                    setThiefPositionY(thiefPositionY - theifSpeed);
                }
                if(thiefPositionY >= 640){
                    setThiefPositionY(thiefPositionY - theifSpeed);
                }
            }
            if(thiefPositionX > 395 && thiefPositionX < 570){
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
        checkIfNearPainting1();
        checkIfNearPainting2();
        checkIfNearPainting3();
        checkIfNearPainting4();
    }
    return ( 
        <div className="map-container" style={{height: `${containerHeight}px`, width: `${containerWidth}px`, backgroundImage: `url(${mapImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundColor: `black`, backgroundPosition: "center"}}>
            <ThiefComponent  containerHeight={containerHeight} containerWidth={containerWidth} thiefPositionX={thiefPositionX} thiefPositionY={thiefPositionY} thiefImage={thiefImage}/>
            {/* <Paintings containerHeight={containerHeight} containerWidth={containerWidth} paintingPositionX={paintingPositionX} paintingPositionY={paintingPositionY} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion}/> */}
            <PaintingComponent containerHeight={containerHeight} containerWidth={containerWidth} paintingPositionX={paintingPosition1X} paintingPositionY={paintingPosition1Y} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion}/>
            <PaintingComponent containerHeight={containerHeight} containerWidth={containerWidth} paintingPositionX={paintingPosition2X} paintingPositionY={paintingPosition2Y} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion}/>
            <PaintingComponent containerHeight={containerHeight} containerWidth={containerWidth} paintingPositionX={paintingPosition3X} paintingPositionY={paintingPosition3Y} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion}/>
            <PaintingComponent containerHeight={containerHeight} containerWidth={containerWidth} paintingPositionX={paintingPosition4X} paintingPositionY={paintingPosition4Y} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion}/>
        </div>
     );
}
 
export default MapContainer;