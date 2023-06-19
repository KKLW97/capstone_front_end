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


const GameContainer = ({updateArtworkInGame, updateGame, currentGame, artworksInGame, fetchStolenArtwork, fetchArtworkInGameByGameId, stolenArtworkList}) => {

  const { stop, setIsPlaying } = useContext(UserContext);
  
  const gameContainerWidth = 1082;
  const gameContainerHeight = 800;

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

  //displays painting info when thief gets close to it (defined by a given proximity value)
  const displayPaintingInfo = (index) => {
    setPaintingInfo(<>{artworksInGame[index].artwork.title}, {artworksInGame[index].artwork.artist}<br/>value: {artworksInGame[index].artwork.value}<br/>{artworksInGame[index].artwork.rarityLevel}</>);
    setDisplayPaintingInfoStatus("visible");
    if (artworksInGame[index].stolen===false){
           setCurrentArtworkInGame(artworksInGame[index]);
    }
    else {setDisplayPaintingInfoStatus("hidden")};
  }

// hides the display painting info when thieft moves away from painting
  const hideDisplayPaintingInfoStatus = () => {
    setDisplayPaintingInfoStatus("hidden");
  }

  // useNavigate 
  const navigate = useNavigate();


  // Forfeit game button handle -- sets complete game to true and navigates to the /playerAccount page
  const handleForfeitGame = async (event) => {
    event.preventDefault();
    currentGame.complete = true;
    await updateGame(currentGame);
    checkCompleteStopSound(currentGame);
    booSound.play();
    navigate("/playerAccount");
  }

  // stops the music once the game ends 
  const checkCompleteStopSound = (updatedCurrentGame) => {
      if(updatedCurrentGame.complete){
        stop();
        setIsPlaying(false)
      }
  }


  // checks the status of the game to set complete to true, play relevant end game sounds (winSound or booSound) and display relevant end game modals (lose or win modals)
  const checkGameStatus = (updatedCurrentGame) => {
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
    }
    return updatedCurrentGame
    
  }
  
  // MCQ handle to check if selected answer is correct or wrong in order to update score or penalty
  const handleClick = async(e) => {
    let updatedCurrentGame = currentGame;

    if(e.target.value === currentQuestion.correct_answer){

      let updatedArtworkInGame = currentArtworkInGame;
      updatedArtworkInGame.stolen = true;
      await updateArtworkInGame(updatedArtworkInGame);

      let valueOfPainting = currentArtworkInGame.artwork.value;
     
      updatedCurrentGame.score = currentGame.score + valueOfPainting;
      setQuestionModal(false);
      scoreSound.play()
      laughSound.play()
      
 
    } else {
      updatedCurrentGame.penalty = currentGame.penalty + 1;
      setQuestionModal(false);
      penaltySound.play();      
    }

    const checkedGame = await checkGameStatus(updatedCurrentGame)
    await updateGame(checkedGame);
    fetchStolenArtwork();
  }



  // displays the relevanty question related to the rarity level of each artwork 
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

// fetching easy difficulty level questions from MCQ (external) API
  const fetchEasyQuestions = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=5&category=25&difficulty=easy&type=multiple");
      const jsonData = await response.json();
      setEasyQuestions(jsonData.results);
  }

  // fetching medium difficulty questions from MCQ (external) API
  const fetchMediumQuestions = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=3&category=25&difficulty=medium&type=multiple");
    const jsonData = await response.json();
    setMediumQuestions(jsonData.results);
  }

  // fetching hard questions from MCQ (external) API
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


  // gets the current question 
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
          {openloseGameModal && <LoseGameModal setLoseGameModal={setLoseGameModal} currentGame={currentGame}/>} 
          {openWinGameModal && <WinGameModal setWinGameModal={setWinGameModal} currentGame={currentGame}/>} 
          {questionModal && <QuestionModal closeModal={setQuestionModal} questionBeingDisplayed={questionBeingDisplayed} currentQuestion={currentQuestion} />} 
          {instructionModal && <InstructionModal closeModal={setInstructionModal}/>}
        </section>
      </div>
        <button className="forfeit" title="forfeit game" onClick={handleForfeitGame}> <img src={door} className="forfeit-image" /></button>
    </>
    
  );

};
 
export default GameContainer;
