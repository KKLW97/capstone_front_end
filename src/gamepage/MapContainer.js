import { useState, useEffect } from "react";
import ThiefComponent from "./ThiefComponent";
import PaintingComponent from "./PaintingComponent";
import mapImage from "../assets/unnamed-1.png";
import Laser from "./Laser";
import SecurityGuard from "./SecurityGuard";

import squeak from "../assets/squeak.mp3"
import zap from "../assets/zap.mp3";
import hmm from "../assets/hmm.mp3"
import ahem from "../assets/ahem.mp3"
import mumble from "../assets/mumble1.mp3"

import paintingSpriteCoordinates from "../data/paintings.json";

const MapContainer = ({artworksInGame, hideDisplayPaintingInfoStatus, displayPaintingInfoStatus, displayCurrentQuestion, paintingInfo, containerWidth, containerHeight, displayPaintingInfo, getEasyQuestion, getMediumQuestion, getHardQuestion, questionBeingDisplayed, setQuestionModal, currentGame}) => {


    const [laserVisibility, setLaserVisibility] = useState("hidden");

    const [thiefPositionX, setThiefPositionX] = useState(480);
    const [thiefPositionY, setThiefPositionY] = useState(0);
    const [thiefImage, setThiefImage] = useState("heading down");

    const [securityGuardPositionX, setSecurityGuardPositionX] = useState(200);
    const [securityGuardPositionY, setSecurityGuardPositionY] = useState(300);
    const [securityGuardImage, setSecurityGuardImage] = useState("heading down");

    const [speechBubble, setSpeechBubble] = useState(null);
    const [guardSpeechBubble, setGuardSpeechBubble] = useState(null);

    // AUDIO FILES
    const zapAudio = new Audio(zap);
    let squeakAudio = new Audio(squeak);
    squeakAudio.volume = 0.2;
    const hmmAudio = new Audio(hmm);
    const ahemAudio = new Audio(ahem);
    const mumbleAudio = new Audio(mumble);


    const laserPositions = [{x: 42, y: 195}, {x: 685, y: 195}];


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
        const intervalId = setInterval(displayLaserVisibility, 5000);
        return () => {
            clearInterval(intervalId);
        }
    }, [])


    const theifSpeed = 10;

    const displayThiefSpeechBubble = (messageString) => {
        setSpeechBubble(<div style={{backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black", borderRadius: "1em"}}><p style={{padding: "10px"}}>{messageString}</p></div>)
        setTimeout(() => {
            setSpeechBubble(null);
        }, 2500);
    }

    const displaySecurityGuardSpeechBubble = (messageString) => {
        setGuardSpeechBubble(<div style={{width: "200px", backgroundColor: "rgba(255, 255, 255, 0.8)", color: "black", borderRadius: "1em"}}><p style={{padding: "10px"}}>{messageString}</p></div>)
        setTimeout(() => {
            setGuardSpeechBubble(null);
        }, 2500);
    }

    const checkIfTouchingLaser = () => {
        if(laserVisibility === "visible" && ((thiefPositionX <= 295 && thiefPositionX >= 40 && thiefPositionY <= 200 && thiefPositionY >= 130) || (thiefPositionX <= 960 && thiefPositionX >= 680 && thiefPositionY <= 200 && thiefPositionY >= 130) )){
            setThiefPositionX(400);
            setThiefPositionY(0);
            displayThiefSpeechBubble("Ouch!");
            zapAudio.play();
          }
    }

    const checkIfNearSecurityGuard = () => {
        const proximityLimit = 80;
        const distance = Math.sqrt(Math.pow(thiefPositionX - securityGuardPositionX, 2) + Math.pow(thiefPositionY - securityGuardPositionY, 2));
        if (distance <= proximityLimit) {
            if(thiefPositionY < securityGuardPositionY && thiefPositionX < securityGuardPositionX){
                setThiefPositionX(thiefPositionX - 20);
                setThiefPositionY(thiefPositionY - 20);
            }
            if(thiefPositionY > securityGuardPositionY && thiefPositionX > securityGuardPositionX){
                setThiefPositionX(thiefPositionX + 20);
                setThiefPositionY(thiefPositionY + 20);
            }
            if(thiefPositionY < securityGuardPositionY && thiefPositionX > securityGuardPositionX){
                setThiefPositionX(thiefPositionX + 20);
                setThiefPositionY(thiefPositionY - 20);
            }
            if(thiefPositionY > securityGuardPositionY && thiefPositionX < securityGuardPositionX){
                setThiefPositionX(thiefPositionX - 20);
                setThiefPositionY(thiefPositionY + 20);
            }
            if(currentGame.penalty === 0){
                displaySecurityGuardSpeechBubble("Bonsoir, Monsieur.");
                displayThiefSpeechBubble("Zut alors! Ahem... bonsoir");
                squeakAudio.play();
                mumbleAudio.play();
            }
            if(currentGame.penalty === 1){
                displaySecurityGuardSpeechBubble("Hmm... suspicious.");
                displayThiefSpeechBubble("Bonsoir...");
                squeakAudio.play();
                hmmAudio.play();

            }
            if(currentGame.penalty === 2){
                displaySecurityGuardSpeechBubble("I've got my eyes on you...");
                squeakAudio.play();
                ahemAudio.play();
            }
        }
    }

    const artProximityLimit = 40;

    const checkIfNearCommonPainting = () => {
        hideDisplayPaintingInfoStatus();
        let distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[0].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[0].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(0);
            getEasyQuestion(0);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[1].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[1].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(1);
            getEasyQuestion(1);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[2].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[2].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(2);
            getEasyQuestion(2);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[3].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[3].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(3);
            getEasyQuestion(3);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[4].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[4].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(4);
            getEasyQuestion(4);
        }
    }
    const checkIfNearRarePainting = () => {
        let distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[5].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[5].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(5);
            getMediumQuestion(0);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[6].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[6].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(6);
            getMediumQuestion(1);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[7].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[7].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(7);
            getMediumQuestion(2);
        }
    }
    const checkIfNearLegendaryPainting = () => {
        let distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[8].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[8].y, 2));
        if (distance <= artProximityLimit) {
            displayPaintingInfo(8);
            getHardQuestion(0);
        }
        distance = Math.sqrt(Math.pow(thiefPositionX - paintingSpriteCoordinates[9].x, 2) + Math.pow(thiefPositionY - paintingSpriteCoordinates[9].y, 2));
        if (distance <= artProximityLimit) {
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
        checkIfNearCommonPainting();
        checkIfNearRarePainting();
        checkIfNearLegendaryPainting();
    }









    return ( 
        <div className="map-container" style={{height: `${containerHeight}px`, width: `${containerWidth}px`, backgroundImage: `url(${mapImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundColor: `black`, backgroundPosition: "center"}}>

            <ThiefComponent speechBubble={speechBubble} displayPaintingInfoStatus={displayPaintingInfoStatus} displayCurrentQuestion={displayCurrentQuestion} paintingInfo={paintingInfo} containerHeight={containerHeight} containerWidth={containerWidth} thiefPositionX={thiefPositionX} thiefPositionY={thiefPositionY} thiefImage={thiefImage} questionBeingDisplayed={questionBeingDisplayed} setQuestionModal={setQuestionModal}/>
            
            {artworksInGame[0]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingSpriteCoordinates[0].x} paintingPositionY={paintingSpriteCoordinates[0].y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingSpriteCoordinates[0].x} paintingPositionY={paintingSpriteCoordinates[0].y}/>}
            
            {artworksInGame[1]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingSpriteCoordinates[1].x} paintingPositionY={paintingSpriteCoordinates[1].y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingSpriteCoordinates[1].x} paintingPositionY={paintingSpriteCoordinates[1].y}/>}
            
            {artworksInGame[2]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingSpriteCoordinates[2].x} paintingPositionY={paintingSpriteCoordinates[2].y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingSpriteCoordinates[2].x} paintingPositionY={paintingSpriteCoordinates[2].y}/>}
            
            {artworksInGame[3]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingSpriteCoordinates[3].x} paintingPositionY={paintingSpriteCoordinates[3].y}/>
            : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingSpriteCoordinates[3].x} paintingPositionY={paintingSpriteCoordinates[3].y}/>}       
            
            {artworksInGame[4]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingSpriteCoordinates[4].x} paintingPositionY={paintingSpriteCoordinates[4].y}/>
            : <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingSpriteCoordinates[4].x} paintingPositionY={paintingSpriteCoordinates[4].y}/>}
            
            {artworksInGame[5]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingSpriteCoordinates[5].x} paintingPositionY={paintingSpriteCoordinates[5].y}/>
                :  <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingSpriteCoordinates[5].x} paintingPositionY={paintingSpriteCoordinates[5].y}/>}
            
            {artworksInGame[6]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingSpriteCoordinates[6].x} paintingPositionY={paintingSpriteCoordinates[6].y}/>
                : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingSpriteCoordinates[6].x} paintingPositionY={paintingSpriteCoordinates[6].y}/>}
            
            {artworksInGame[7]?.stolen ? <PaintingComponent paintingClass={"horizontal_painting stolen"} paintingPositionX={paintingSpriteCoordinates[7].x} paintingPositionY={paintingSpriteCoordinates[7].y}/>
                : <PaintingComponent paintingClass={"horizontal_painting"} paintingPositionX={paintingSpriteCoordinates[7].x} paintingPositionY={paintingSpriteCoordinates[7].y}/>}
            
            {artworksInGame[8]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingSpriteCoordinates[8].x} paintingPositionY={paintingSpriteCoordinates[8].y}/>
                : <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingSpriteCoordinates[8].x} paintingPositionY={paintingSpriteCoordinates[8].y}/>}
            
            {artworksInGame[9]?.stolen ? <PaintingComponent paintingClass={"vertical_painting stolen"} paintingPositionX={paintingSpriteCoordinates[9].x} paintingPositionY={paintingSpriteCoordinates[9].y}/>
            : <PaintingComponent paintingClass={"vertical_painting"} paintingPositionX={paintingSpriteCoordinates[9].x} paintingPositionY={paintingSpriteCoordinates[9].y}/>}
            <Laser laserPositionX={laserPositions[0].x} laserPositionY={laserPositions[0].y} laserVisibility={laserVisibility}/>
            <Laser laserPositionX={laserPositions[1].x} laserPositionY={laserPositions[1].y} laserVisibility={laserVisibility}/>
            <SecurityGuard guardSpeechBubble={guardSpeechBubble} securityGuardPositionX={securityGuardPositionX} securityGuardPositionY={securityGuardPositionY} securityGuardImage={securityGuardImage}/>

        </div>
     );
}
 
export default MapContainer;