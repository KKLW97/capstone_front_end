import { useContext, useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import LoseGameModal from "./LoseGameModal";
import WinGameModal from "./WinGameModal";
import QuestionModal from "./QuestionModal";
import PaintingListContainer from "../containers/PaintingListContainer";
import {decode} from 'html-entities';
import InstructionModal from "./InstructionModal";
import "../CSSfiles/PenaltyList.css"
import "../CSSfiles/App.css";
import PenaltyList from "./PenaltyList";
import { useNavigate } from "react-router-dom";
import door from '../assets/door.png';
import "../CSSfiles/Forfeit.css";
import scoreAudio from "../assets/correctsound.mp3";
import penaltyAudio from "../assets/incorrectsound.mp3";
import boo from "../assets/boo.mp3"
import laugh from "../assets/FrenchLaugh.mp3"
import win from "../assets/win.mp3"
import { UserContext } from "../App";


const GameContainer = ({updateArtworkInGame, updateGame, activePlayer, currentGame, setCurrentGame, artworksInGame, fetchStolenArtwork, fetchArtworkInGameByGameId, stolenArtworkList}) => {

  const {play, stop, isPlaying, setIsPlaying} = useContext(UserContext);
  
  const [gameContainerWidth, setGameContainerWidth] = useState(1082);
  const [gameContainerHeight, setGameContainerHeight] = useState(800);
  const [paintingInfo, setPaintingInfo] = useState([]);

  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questionBeingDisplayed, setQuestionBeingDisplayed] = useState();

  const [displayPaintingInfoStatus, setDisplayPaintingInfoStatus] = useState("hidden");

  const [currentArtworkInGame, setCurrentArtworkInGame] = useState(null);

  const [instructionModal, setInstructionModal] = useState(false);
  
  const [openloseGameModal, setLoseGameModal] = useState(false);
  const [openWinGameModal, setWinGameModal] = useState(false);

  const [questionModal, setQuestionModal] = useState(false);


  //sounds
  const scoreSound = new Audio(scoreAudio);
  const penaltySound = new Audio(penaltyAudio);
  const laughSound = new Audio(laugh);
  const booSound = new Audio(boo);
  const winSound = new Audio(win);

  const displayPaintingInfo = (index) => {
    setPaintingInfo(<>{artworksInGame[index].artwork.title}, {artworksInGame[index].artwork.artist}<br/>value: {artworksInGame[index].artwork.value}<br/>{artworksInGame[index].artwork.rarityLevel}</>);
    setDisplayPaintingInfoStatus("visible");
    if (artworksInGame[index].stolen===false){
           setCurrentArtworkInGame(artworksInGame[index]);
    }
    else {setDisplayPaintingInfoStatus("hidden")};
  }

  const hideDisplayPaintingInfoStatus = () => {
    setDisplayPaintingInfoStatus("hidden");
  }

  const navigate = useNavigate();

  const handleForfeitGame = async (event) => {
    event.preventDefault();
    currentGame.complete = true;
    await updateGame(currentGame);
    checkCompleteStopSound(currentGame);
    booSound.play();
    navigate("/playerAccount");
  }

  const checkCompleteStopSound = (updatedCurrentGame) => {
      if(updatedCurrentGame.complete){
        stop();
        setIsPlaying(false)
      }
  }


  const checkGameStatus = (updatedCurrentGame) => {
    console.log("stolen artworks" , stolenArtworkList)
 
    const WModalHandle = () => setWinGameModal(true)
    const LmodalHandle = () => setLoseGameModal(true) 
    if (updatedCurrentGame.penalty===3) {
      
      updatedCurrentGame.complete = true;
      checkCompleteStopSound(updatedCurrentGame);
      updatedCurrentGame.score = 0;
      booSound.play();
      LmodalHandle();
    } else if (stolenArtworkList.length === artworksInGame.length-1){
      updatedCurrentGame.complete = true;
      checkCompleteStopSound(updatedCurrentGame);
      winSound.play();
      WModalHandle();
      console.log("stolen art from check",stolenArtworkList)
      console.log(currentGame.complete)
      
    }
    return updatedCurrentGame
    
  }
  

  
  
  const handleClick = async(e) => {
    let updatedCurrentGame = currentGame;

    if(e.target.value === currentQuestion.correct_answer){

      let updatedArtworkInGame = currentArtworkInGame;
      updatedArtworkInGame.stolen = true;
      await updateArtworkInGame(updatedArtworkInGame);
      console.log("switch to the correct message");
    

      let valueOfPainting = currentArtworkInGame.artwork.value;
     
      updatedCurrentGame.score = currentGame.score + valueOfPainting;
      setQuestionModal(false);
      scoreSound.play()
      laughSound.play()
      
 
    } else {
      updatedCurrentGame.penalty = currentGame.penalty + 1;
      console.log("switch to the incorrect message")
      setQuestionModal(false);
      penaltySound.play();      
    }

    const checkedGame = await checkGameStatus(updatedCurrentGame)
    await updateGame(checkedGame);
    fetchStolenArtwork();
  }


  const displayCurrentQuestion = () => {
    const incorrectAnswers = currentQuestion.incorrect_answers;
    const answers = []
    answers.push(currentQuestion.correct_answer, incorrectAnswers[0], incorrectAnswers[1], incorrectAnswers[2]);
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffledAnswers = shuffleArray(answers);
    setQuestionBeingDisplayed
    (<>
      <h1 className="question">{decode(currentQuestion.question)}</h1>
      <div className="btn__wrapper">
        <button className="question__btn" onClick={handleClick} value={shuffledAnswers[0]} >{decode(shuffledAnswers[0])}</button>
        <button className="question__btn" onClick={handleClick} value={shuffledAnswers[1]}>{decode(shuffledAnswers[1])}</button>
        <button className="question__btn" onClick={handleClick} value={shuffledAnswers[2]}>{decode(shuffledAnswers[2])}</button>
        <button className="question__btn" onClick={handleClick} value={shuffledAnswers[3]}>{decode(shuffledAnswers[3])}</button>
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
    fetchStolenArtwork(parseInt(currentGame.id));
    fetchArtworkInGameByGameId(parseInt(currentGame.id)); 
    setInstructionModal(true);
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
    <>
      <div >
        <section className="game-and-stolen-art-list">
          <PenaltyList currentGame={currentGame}/>
          <MapContainer currentGame={currentGame} artworksInGame={artworksInGame} hideDisplayPaintingInfoStatus={hideDisplayPaintingInfoStatus} displayPaintingInfoStatus={displayPaintingInfoStatus} displayCurrentQuestion={displayCurrentQuestion} paintingInfo={paintingInfo} containerWidth={gameContainerWidth} containerHeight={gameContainerHeight} displayPaintingInfo={displayPaintingInfo} getEasyQuestion={getEasyQuestion} getMediumQuestion={getMediumQuestion} getHardQuestion={getHardQuestion} questionBeingDisplayed={questionBeingDisplayed} setQuestionModal={setQuestionModal}/>

          <PaintingListContainer stolenArtworkList={stolenArtworkList} questionBeingDisplayed={questionBeingDisplayed} currentGame={currentGame}/>
          {openloseGameModal && <LoseGameModal setLoseGameModal={setLoseGameModal} />} 
          {openWinGameModal && <WinGameModal setWinGameModal={setWinGameModal} />} 
          {questionModal && <QuestionModal closeModal={setQuestionModal} questionBeingDisplayed={questionBeingDisplayed} currentQuestion={currentQuestion} />} 

        </section>
      </div>
        <button className="forfeit" title="forfeit game" onClick={handleForfeitGame}> <img src={door} className="forfeit-image" /></button>
    </>
    
  );

};
 
export default GameContainer;
