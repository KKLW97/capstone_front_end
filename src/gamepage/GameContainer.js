import { useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import PaintingListContainer from "../containers/PaintingListContainer";

const GameContainer = (activePlayer, currentGame, setCurrentGame) => {

  const [gameContainerWidth, setGameContainerWidth] = useState(1082);
  const [gameContainerHeight, setGameContainerHeight] = useState(800);
  const [artworksInGame, setArtworksInGame] = useState([]);
  const [paintingInfo, setPaintingInfo] = useState([]);

  const fetchArtworkInGameByGameId = async () => {
    // gameId is hard-coded for now
    const response = await fetch(`http://localhost:8080/artworksInGame?game_id=2`)
    const jsonData = await response.json();
    const artworks = jsonData.map((artworkGame)=>artworkGame.artwork)
    setArtworksInGame(artworks);
  };

  useEffect(() => {
    fetchArtworkInGameByGameId();
  }, []);

  const displayPaintingInfo = (index) => {
    // console.log("Displays modal for Multiple Choice Question / Displays info about painting, giving the option for the player to select this painting");
    console.log(`${artworksInGame[index].title}, ${artworksInGame[index].artist}`);
    setPaintingInfo(<>{artworksInGame[index].title}, {artworksInGame[index].artist}<br/>£{artworksInGame[index].value}</>);
}
  // find the corresponding game for player 

  // const fetchGameForPlayer = async () => {
  //   const response = await fetch("https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple");
  //   const jsonData = await response.json();
  //   setFirstQuestion(jsonData);
  // };

  // useEffect(() => {
  //   fetchGameForPlayer();
  // }, []);

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
      <div className="game-and-stolen-art-list">
        <MapContainer containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayPaintingInfo={displayPaintingInfo}/>
        <PaintingListContainer paintingInfo={paintingInfo}/>
      </div>
    );
};

export default GameContainer;
