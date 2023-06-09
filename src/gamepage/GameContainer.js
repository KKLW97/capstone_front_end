import { useState } from "react";
import MapContainer from "./MapContainer";
import PaintingListContainer from "../containers/PaintingListContainer";

const GameContainer = () => {

  const [gameContainerWidth, setGameContainerWidth] = useState(600);
  const [gameContainerHeight, setGameContainerHeight] = useState(600);

  const [paintingPositionX, setPaintingPositionX] = useState(270);
  const [paintingPositionY, setPaintingPositionY] = useState(255);    

  const displayMultipleChoiceQuestion = () => {
      console.log("Displays modal for Multiple Choice Question / Displays info about painting, giving the option for the player to select this painting");
  }
  
  return (
    <>
      <h3> This is the game container !!!</h3>

      <MapContainer containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion} paintingPositionX={paintingPositionX} paintingPositionY={paintingPositionY}/>
      <PaintingListContainer />
    </>
  );
};

export default GameContainer;
