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
  const [questionBeingDisplayed, setQuestionBeingDisplayed] = useState();

  const [displayPaintingInfoStatus, setDisplayPaintingInfoStatus] = useState("hidden");


  const displayPaintingInfo = (index) => {
    // console.log("Displays modal for Multiple Choice Question / Displays info about painting, giving the option for the player to select this painting");
    // console.log(`${artworksInGame[index].title}, ${artworksInGame[index].artist}`);
    setPaintingInfo(<>{artworksInGame[index].title}, {artworksInGame[index].artist}<br/>£{artworksInGame[index].value}<br/>{artworksInGame[index].rarityLevel.substring(0, 1) + artworksInGame[index].rarityLevel.substring(1).toLowerCase()}</>);
    setDisplayPaintingInfoStatus("visible");
  }

  const hideDisplayPaintingInfoStatus = () => {
    setDisplayPaintingInfoStatus("hidden");
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
    setQuestionBeingDisplayed(<>{currentQuestion.question}<br/><button>{shuffledAnswers[0]}</button><button>{shuffledAnswers[1]}</button><button>{shuffledAnswers[2]}</button><button>{shuffledAnswers[3]}</button></>);
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
        <MapContainer hideDisplayPaintingInfoStatus={hideDisplayPaintingInfoStatus} displayPaintingInfoStatus={displayPaintingInfoStatus} displayCurrentQuestion={displayCurrentQuestion} paintingInfo={paintingInfo} containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayPaintingInfo={displayPaintingInfo} getEasyQuestion={getEasyQuestion} getMediumQuestion={getMediumQuestion} getHardQuestion={getHardQuestion}/>
        <PaintingListContainer questionBeingDisplayed={questionBeingDisplayed}/>
        {/* {questionBeingDisplayed} */}
      </div>
    );
};

export default GameContainer;
