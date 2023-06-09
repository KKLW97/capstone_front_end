import { useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import PaintingListContainer from "../containers/PaintingListContainer";

const GameContainer = (activePlayer, currentGame, setCurrentGame, artworksInGame) => {

  const [gameContainerWidth, setGameContainerWidth] = useState(600);
  const [gameContainerHeight, setGameContainerHeight] = useState(600);

  const [paintingPositionX, setPaintingPositionX] = useState(270);
  const [paintingPositionY, setPaintingPositionY] = useState(255);  
  
  // const [artworksInGame, setArtworksInGame] = useState(null);

  const [fistQuestion, setFirstQuestion] = useState(null);

  const [rarity, setRarity] = useState("");

  const displayMultipleChoiceQuestion = () => {
      console.log("Displays modal for Multiple Choice Question / Displays info about painting, giving the option for the player to select this painting");
  }


    
  
  // const fetchArtworkInGameByGameId = async () => {
  //   const response = await fetch("http://localhost:8080/artworksInGame?game_id=2")
  //   const jsonData = await response.json();
  //   setArtworksInGame(jsonData);
  // };

  // useEffect(() => {
  
  //   fetchArtworkInGameByGameId();
  // }, []);

  // find the corresponding game for player 

    const fetchGameForPlayer = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple");
      const jsonData = await response.json();
      setFirstQuestion(jsonData);
    };

  useEffect(() => {
    fetchGameForPlayer();
  }, []);

  // const firstArtworkRarity = artworksInGame.length > 0 ? artworksInGame[0].artwork.rarityLevel : "";
  // console.log(firstArtworkRarity);


//   const fetchQuestion = async(rarity) => {
//     let question = ""
//     if(rarity === "LEGENDARY"){
//       question = await fetch("https://opentdb.com/api.php?amount=1&category=25&difficulty=hard&type=multiple")
      

//     } else if (rarity === "COMMON"){
//       question = await fetch("https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple")

//     }else{
//      question = await fetch("https://opentdb.com/api.php?amount=1&category=25&difficulty=medium&type=multiple")
//     }

//     const jsonData = await question.json();
//     console.log(jsonData);

//     return jsonData;
    
//   }

//   setFirstQuestion(fetchQuestion(firstArtworkRarity));






  
  return (
    <>
      <h3> This is the game container !!!</h3>

      <MapContainer containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayMultipleChoiceQuestion={displayMultipleChoiceQuestion} paintingPositionX={paintingPositionX} paintingPositionY={paintingPositionY}/>
      <PaintingListContainer />
    </>
  );
};

export default GameContainer;
