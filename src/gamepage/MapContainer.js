import { useState, useEffect } from "react";
import ThiefComponent from "./ThiefComponent";
import PaintingComponent from "./PaintingComponent";
import mapImage from "../assets/unnamed-1.png";
import Laser from "./Laser";
import SecurityGuard from "./SecurityGuard";

const MapContainer = ({artworksInGame, hideDisplayPaintingInfoStatus, displayPaintingInfoStatus, displayCurrentQuestion, paintingInfo, containerWidth, containerHeight, displayPaintingInfo, getEasyQuestion, getMediumQuestion, getHardQuestion, questionBeingDisplayed}) => {

    const [laserVisibility, setLaserVisibility] = useState("hidden");
    const [randomInterval, setRandominterval] = useState(5000);

    const [thiefPositionX, setThiefPositionX] = useState(480);
    const [thiefPositionY, setThiefPositionY] = useState(0);
    const [thiefImage, setThiefImage] = useState("heading down");

    const [securityGuardPositionX, setSecurityGuardPositionX] = useState(200);
    const [securityGuardPositionY, setSecurityGuardPositionY] = useState(300);
    const [securityGuardImage, setSecurityGuardImage] = useState("heading down");

    const [speechBubble, setSpeechBubble] = useState(null);
    const [guardSpeechBubble, setGuardSpeechBubble] = useState(null);

    const laserPosition1X = 42;
    const laserPosition1Y = 195;
    const laserPosition2X = 685;
    const laserPosition2Y = 195;


    const moveSecurityGuardRight = () => {
        setSecurityGuardImage("heading right");
        setSecurityGuardPositionX(securityGuardPositionX + 5);
      };
    const moveSecurityGuardDown = () => {
        setSecurityGuardImage("heading down");
        setSecurityGuardPositionY(securityGuardPositionY + 5);
      };
    const moveSecurityGuardLeft = () => {
        setSecurityGuardImage("heading left");
        setSecurityGuardPositionX(securityGuardPositionX - 5);
      };
    const moveSecurityGuardUp = () => {
        setSecurityGuardImage("heading up");
        setSecurityGuardPositionY(securityGuardPositionY - 5);
      };

    useEffect(()=>{
        checkIfNearSecurityGuard();
        checkIfTouchingLaser();
        if(securityGuardPositionX <= 800 && securityGuardPositionY <= 280){
            const intervalId = setInterval(moveSecurityGuardRight, 100);
            return () => {
                clearInterval(intervalId);
            }
        }
        if(securityGuardPositionX >= 600 && securityGuardPositionY <= 650){
            const intervalId = setInterval(moveSecurityGuardDown, 100);
            return () => {
                clearInterval(intervalId);
            }
        }
        if(securityGuardPositionX >= 180 && securityGuardPositionY >= 650){
            const intervalId = setInterval(moveSecurityGuardLeft, 100);
            return () => {
                clearInterval(intervalId);
            }
        }
        if(securityGuardPositionX >= 160 && securityGuardPositionY >= 200){
            const intervalId = setInterval(moveSecurityGuardUp, 100);
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [securityGuardPositionX, securityGuardPositionY])

    const displayLaserVisibility = () => {
        setLaserVisibility("visible");
        setTimeout(() => {
          setLaserVisibility("hidden");
        }, 1000);
      };

    useEffect(()=>{
        const intervalId = setInterval(displayLaserVisibility,randomInterval);
        setRandominterval(5000);
        return () => {
            clearInterval(intervalId);
        }
    }, [])


    const paintingPosition1X = 150;
    const paintingPosition1Y = 40;

    const paintingPosition2X = 790;
    const paintingPosition2Y = 40; 

    const paintingPosition3X = 190;
    const paintingPosition3Y = 720;

    const paintingPosition4X = 750;
    const paintingPosition4Y = 720; 

    const paintingPosition5X = 10;
    const paintingPosition5Y = 100;

    const paintingPosition6X = 90;
    const paintingPosition6Y = 615; 

    const paintingPosition7X = 290;
    const paintingPosition7Y = 485; 

    const paintingPosition8X = 650;
    const paintingPosition8Y = 485; 

    const paintingPosition9X = 940;
    const paintingPosition9Y = 100;

    const paintingPosition10X = 855;
    const paintingPosition10Y = 615; 
    
    const theifSpeed = 10;

    const displayThiefSpeechBubble = (messageString) => {
        setSpeechBubble(<div style={{backgroundColor: "white", color: "black", padding: "10px", borderRadius: "1em"}}>{messageString}</div>)
        setTimeout(() => {
            setSpeechBubble(null);
        }, 2000);
    }

    const displaySecurityGuardSpeechBubble = (messageString) => {
        setGuardSpeechBubble(<div style={{backgroundColor: "white", color: "black", padding: "10px", borderRadius: "1em"}}>{messageString}</div>)
        setTimeout(() => {
            setGuardSpeechBubble(null);
        }, 2000);
    }

    const checkIfTouchingLaser = () => {
        if(laserVisibility == "visible" && ((thiefPositionX <= 295 && thiefPositionX >= 40 && thiefPositionY <= 200 && thiefPositionY >= 130) || (thiefPositionX <= 960 && thiefPositionX >= 680 && thiefPositionY <= 200 && thiefPositionY >= 130) )){
            console.log("hit by laser");
            setThiefPositionX(400);
            setThiefPositionY(0);
            displayThiefSpeechBubble("Ouch!");
          }
    }

    const checkIfNearSecurityGuard = () => {
        const proximityLimit = 80;
        const distance = Math.sqrt(Math.pow(thiefPositionX - securityGuardPositionX, 2) + Math.pow(thiefPositionY - securityGuardPositionY, 2));
        if (distance <= proximityLimit) {
            console.log("penalty");
            setThiefPositionX(400);
            setThiefPositionY(0);
            displaySecurityGuardSpeechBubble("Hmm... suspicious");
            }
    }

    const checkIfNearPainting1 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition1X, 2) + Math.pow(thiefPositionY - paintingPosition1Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(0);
            getEasyQuestion(0);
          }
          else {
            hideDisplayPaintingInfoStatus(0);
          }
    }

    const checkIfNearPainting2 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition2X, 2) + Math.pow(thiefPositionY - paintingPosition2Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(1);
            getEasyQuestion(1);
          }
    }
    const checkIfNearPainting3 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition3X, 2) + Math.pow(thiefPositionY - paintingPosition3Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(2);
            getEasyQuestion(2);
          }
    }
    const checkIfNearPainting4 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition4X, 2) + Math.pow(thiefPositionY - paintingPosition4Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(3);
            getEasyQuestion(3);
          }
    }
    const checkIfNearPainting5 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition5X, 2) + Math.pow(thiefPositionY - paintingPosition5Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(4);
            getEasyQuestion(4);
          }
    }
    const checkIfNearPainting6 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition6X, 2) + Math.pow(thiefPositionY - paintingPosition6Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(5);
            getMediumQuestion(0);
          }
    }
    const checkIfNearPainting7 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition7X, 2) + Math.pow(thiefPositionY - paintingPosition7Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(6);
            getMediumQuestion(1);
          }
    }
    const checkIfNearPainting8 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition8X, 2) + Math.pow(thiefPositionY - paintingPosition8Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(7);
            getMediumQuestion(2);
          }
    }
    const checkIfNearPainting9 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition9X, 2) + Math.pow(thiefPositionY - paintingPosition9Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(8);
            getHardQuestion(0);
          }
    }
    const checkIfNearPainting10 = () => {
        const proximityLimit = 40;
        const distance = Math.sqrt(Math.pow(thiefPositionX - paintingPosition10X, 2) + Math.pow(thiefPositionY - paintingPosition10Y, 2));
        if (distance <= proximityLimit) {
            displayPaintingInfo(9);
            getHardQuestion(1);
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
        checkIfNearPainting5();
        checkIfNearPainting6();
        checkIfNearPainting7();
        checkIfNearPainting8();
        checkIfNearPainting9();
        checkIfNearPainting10();
    }
    return ( 
        <div className="map-container" style={{height: `${containerHeight}px`, width: `${containerWidth}px`, backgroundImage: `url(${mapImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundColor: `black`, backgroundPosition: "center"}}>
            <ThiefComponent speechBubble={speechBubble} displayPaintingInfoStatus={displayPaintingInfoStatus} displayCurrentQuestion={displayCurrentQuestion} paintingInfo={paintingInfo} containerHeight={containerHeight} containerWidth={containerWidth} thiefPositionX={thiefPositionX} thiefPositionY={thiefPositionY} thiefImage={thiefImage} questionBeingDisplayed={questionBeingDisplayed}/>
            
            {artworksInGame[0]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingPosition1X} paintingPositionY={paintingPosition1Y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingPosition1X} paintingPositionY={paintingPosition1Y}/>}
            
            {artworksInGame[1]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingPosition2X} paintingPositionY={paintingPosition2Y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingPosition2X} paintingPositionY={paintingPosition2Y}/>}
            
            {artworksInGame[2]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingPosition3X} paintingPositionY={paintingPosition3Y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingPosition3X} paintingPositionY={paintingPosition3Y}/>}
            
            {artworksInGame[3]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingPosition4X} paintingPositionY={paintingPosition4Y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingPosition4X} paintingPositionY={paintingPosition4Y}/>}       
            
            {artworksInGame[4]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingPosition5X} paintingPositionY={paintingPosition5Y}/>
            : <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingPosition5X} paintingPositionY={paintingPosition5Y}/>}
            
            {artworksInGame[5]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingPosition6X} paintingPositionY={paintingPosition6Y}/>
                :  <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingPosition6X} paintingPositionY={paintingPosition6Y}/>}
            
            {artworksInGame[6]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingPosition7X} paintingPositionY={paintingPosition7Y}/>
                : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingPosition7X} paintingPositionY={paintingPosition7Y}/>}
            
            {artworksInGame[7]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingPosition8X} paintingPositionY={paintingPosition8Y}/>
                : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingPosition8X} paintingPositionY={paintingPosition8Y}/>}
            
            {artworksInGame[8]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingPosition9X} paintingPositionY={paintingPosition9Y}/>
                : <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingPosition9X} paintingPositionY={paintingPosition9Y}/>}
            
            {artworksInGame[9]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingPosition10X} paintingPositionY={paintingPosition10Y}/>
            : <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingPosition10X} paintingPositionY={paintingPosition10Y}/>}
            <Laser laserPositionX={laserPosition1X} laserPositionY={laserPosition1Y} laserVisibility={laserVisibility}/>
            <Laser laserPositionX={laserPosition2X} laserPositionY={laserPosition2Y} laserVisibility={laserVisibility}/>
            <SecurityGuard guardSpeechBubble={guardSpeechBubble} securityGuardPositionX={securityGuardPositionX} securityGuardPositionY={securityGuardPositionY} securityGuardImage={securityGuardImage}/>
            {/* {paintingInfo ? <button style={{position: "absolute", left: "0px", bottom: "100px", color: "black", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "10px", border: "2px solid black"}}>{paintingInfo}</button> : null} */}
        </div>
     );
}
 
export default MapContainer;