import { useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import PaintingListContainer from "../containers/PaintingListContainer";
import {decode} from 'html-entities';

import "../CSSfiles/App.css";
const GameContainer = ({updateArtworkInGame, updateGame, activePlayer, currentGame, setCurrentGame, artworksInGame, fetchStolenArtwork}) => {

  const [gameContainerWidth, setGameContainerWidth] = useState(1082);
  const [gameContainerHeight, setGameContainerHeight] = useState(800);
  // const [artworksInGame, setArtworksInGame] = useState([]);
  const [paintingInfo, setPaintingInfo] = useState([]);

  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questionBeingDisplayed, setQuestionBeingDisplayed] = useState();

  const [displayPaintingInfoStatus, setDisplayPaintingInfoStatus] = useState("hidden");

  const [currentArtworkInGame, setCurrentArtworkInGame] = useState(null);

  // const [guess, setGuess] = useState();


  const displayPaintingInfo = (index) => {
    // console.log("Displays modal for Multiple Choice Question / Displays info about painting, giving the option for the player to select this painting");
    // console.log(`${artworksInGame[index].title}, ${artworksInGame[index].artist}`);
    setPaintingInfo(<>{artworksInGame[index].artwork.title}, {artworksInGame[index].artwork.artist}<br/>£{artworksInGame[index].artwork.value}<br/>{artworksInGame[index].artwork.rarityLevel.substring(0, 1) + artworksInGame[index].rarityLevel}</>);
    setDisplayPaintingInfoStatus("visible");
    if (artworksInGame[index].stolen===false){
           setCurrentArtworkInGame(artworksInGame[index]);
    }
    else {setDisplayPaintingInfoStatus("hidden")};
  }



  const hideDisplayPaintingInfoStatus = () => {
    setDisplayPaintingInfoStatus("hidden");
  }


  //CONDITIONS FOR COMPLETING THE GAME



  // 2: FORFEIT/ ESCAPE!
  // user manually clicks end game, Game set to complete, message "you forfeit" (separate handleClick)



  const checkGameStatus = () => {

  let updatedGame = currentGame  
  // 1: LOSE 
  // PENALTY = 3, Game set to complete, message"you lose"
  
  if (updatedGame.penalty===3) {
    
    updatedGame.complete = true;
    updatedGame.score = 0;
    setCurrentGame(updatedGame)
    // add modal/message saying "you lose everything... crime doesn't pay apparently"
  }

  // else if ()
    // 3: WIN!!! 
  // all 10 paintings = stolen.true, game set to complete, message "you won"
  }
  
  const handleClick = async(e) => {
    // console.log(e.target.innerText == currentQuestion.correct_answer);
    let updatedCurrentGame = currentGame;

    if(e.target.innerText == currentQuestion.correct_answer){
      // 1) set relevant artwork in artworksInGame (change stolen boolean in artwork game to true)
      let updatedArtworkInGame = currentArtworkInGame;
      updatedArtworkInGame.stolen = true;
      await updateArtworkInGame(updatedArtworkInGame);
      console.log(updatedArtworkInGame);
                              //change to current painting object
      let valueOfPainting = currentArtworkInGame.artwork.value;
      // 2) set current game with updated score
                                    //change to current painting object value
      updatedCurrentGame.score = currentGame.score + valueOfPainting;
      // setCurrentGame({updatedCurrentGame});
      
      // remove painting sprite?
      
    } else {
      // 3) set current game with updated penalty
      updatedCurrentGame.penalty = currentGame.penalty + 1;
      // setCurrentGame({updatedCurrentGame});
    }
    await updateGame(updatedCurrentGame);    
    fetchStolenArtwork();

  }


  const displayCurrentQuestion = () => {
    const incorrectAnswers = currentQuestion.incorrect_answers;
    const answers = []
    answers.push(currentQuestion.correct_answer, incorrectAnswers[0], incorrectAnswers[1], incorrectAnswers[2]);
    // 3) shuffle, map and in the map create the answer buttons
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffledAnswers = shuffleArray(answers);
    // 4) then set the question being displayed to be the variable the map is saved to
    setQuestionBeingDisplayed
    (<>
      <h1>{decode(currentQuestion.question)}</h1>
      <br/>
      <div className="btn__wrapper">
        <button className="question__btn" onClick={handleClick} name={shuffledAnswers[0]} >{decode(shuffledAnswers[0])}</button>
        <button className="question__btn" onClick={handleClick} name={shuffledAnswers[1]}>{decode(shuffledAnswers[1])}</button>
        <button className="question__btn" onClick={handleClick} name={shuffledAnswers[2]}>{decode(shuffledAnswers[2])}</button>
        <button className="question__btn" onClick={handleClick} name={shuffledAnswers[3]}>{decode(shuffledAnswers[3])}</button>
      </div>
    </>);
  }

  useEffect(()=>{
    if(currentQuestion && currentQuestion.correct_answer){
      displayCurrentQuestion();
    }
  }, [currentQuestion])


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
    setDisplayPaintingInfoStatus("hidden");
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

  return (
      <div className="game-and-stolen-art-list">
        <MapContainer artworksInGame={artworksInGame} hideDisplayPaintingInfoStatus={hideDisplayPaintingInfoStatus} displayPaintingInfoStatus={displayPaintingInfoStatus} displayCurrentQuestion={displayCurrentQuestion} paintingInfo={paintingInfo} containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayPaintingInfo={displayPaintingInfo} getEasyQuestion={getEasyQuestion} getMediumQuestion={getMediumQuestion} getHardQuestion={getHardQuestion} questionBeingDisplayed={questionBeingDisplayed} />
        <PaintingListContainer questionBeingDisplayed={questionBeingDisplayed}/>
        {/* {questionBeingDisplayed} */}

      </div>
    );
};

export default GameContainer;
