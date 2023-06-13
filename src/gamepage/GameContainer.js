import { useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import PaintingListContainer from "../containers/PaintingListContainer";


import "../CSSfiles/App.css";
const GameContainer = ({activePlayer, currentGame, setCurrentGame, artworksInGame}) => {

  const [gameContainerWidth, setGameContainerWidth] = useState(1082);
  const [gameContainerHeight, setGameContainerHeight] = useState(800);
  // const [artworksInGame, setArtworksInGame] = useState([]);
  const [paintingInfo, setPaintingInfo] = useState([]);

  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState({});

  // const fetchArtworkInGameByGameId = async (gameId) => {
  //   // gameId is hard-coded for now
  //   const response = await fetch(`http://localhost:8080/artworksInGame?game_id=${gameId}`)
  //   const jsonData = await response.json();
  //   // const artworks = jsonData.map((artworkGame)=>artworkGame.artwork)
  //   setArtworksInGame(jsonData);
  //   console.log(jsonData);
  // };

  // useEffect(() => {
  //   fetchArtworkInGameByGameId(parseInt(currentGame.id));
  // }, []);

  const displayPaintingInfo = (index) => {
    // console.log("Displays modal for Multiple Choice Question / Displays info about painting, giving the option for the player to select this painting");
    console.log(`${artworksInGame[index].title}, ${artworksInGame[index].artist}`);
    setPaintingInfo(<>{artworksInGame[index].title}, {artworksInGame[index].artist}<br/>Value: £{artworksInGame[index].value}<br/>Rarity: {artworksInGame[index].rarityLevel}</>);
  }


  const fetchEasyQuestions = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=5&category=25&difficulty=easy&type=multiple");
      const jsonData = await response.json();
      setEasyQuestions(jsonData.results);
  }

  const fetchMediumQuestions = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=3&category=25&difficulty=medium&type=multiple");
    const jsonData = await response.json();
    setMediumQuestions(jsonData.results);
  }

  const fetchHardQuestions = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=2&category=25&difficulty=hard&type=multiple");
    const jsonData = await response.json();
    setHardQuestions(jsonData.results);
  }

  useEffect(()=>{
    fetchEasyQuestions();
    fetchMediumQuestions();
    fetchHardQuestions();
  }, [])

  const getEasyQuestion = (index) => {
    setCurrentQuestion(easyQuestions[index]);
  }
  const getMediumQuestion = (index) => {
    setCurrentQuestion(mediumQuestions[index]);
  }
  const getHardQuestion = (index) => {
    setCurrentQuestion(hardQuestions[index]);
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
        <MapContainer containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayPaintingInfo={displayPaintingInfo} getEasyQuestion={getEasyQuestion} getMediumQuestion={getMediumQuestion} getHardQuestion={getHardQuestion}/>
        <PaintingListContainer paintingInfo={paintingInfo}/>
      </div>
    );
};

export default GameContainer;
