// import "./App.css";
import GameContainer from "./gamepage/GameContainer";
import LandingContainer from "./homepage/LandingContainer";

//react router imports
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import PlayerContainer from "./containers/PlayerContainer";
import LoginContainer from "./homepage/LoginContainer";
import Navbar from "./components/Navbar";
import { useEffect, useState, createContext, useContext } from "react";




// audio useSound
import useSound from "use-sound";
import gameAudio from './assets/game.mp3'
import audioOn from "./assets/audio-on.png"
import audioMute from "./assets/mute.png"
import "./CSSfiles/AudioButton.css"


const SERVER_URL = "http://localhost:8080";

export const UserContext = createContext({
  activePlayer : null,
  setActivePlayer : () => {}
});

function App() {

  const [allPlayers, setAllPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [currentGame, setCurrentGame] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);
  const [incompleteGamesForPlayer, setIncompleteGamesForPlayer] = useState([]);
  const [allGamesForPlayer, setAllGamesForPlayer] = useState([]);
  const [allCompletedGamesForPlayer, setAllCompletedGamesForPlayer] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [allCompleteGames, setAllCompleteGames] = useState([]);
  const [artworksInGame, setArtworksInGame] = useState([]);
  const [stolenArtworkList, setStolenArtworkList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, {stop}] = useSound(gameAudio, {
    playbackRate: 0.75,
    volume: 0.2
  })


  // get all players 
  const fetchAllPlayers = async () => {
      const response = await fetch("http://localhost:8080/players");
      const jsonData = await response.json();
      setAllPlayers(jsonData)
  }
 

  // get player by id 
  const fetchPlayerById = async (playerId) => {
    const response = await fetch(`http://localhost:8080/players/${playerId}`)
    const jsonData = await response.json();
    setActivePlayer(jsonData);
  };


  //called function when page loads
  useEffect(() => {
    fetchAllPlayers(); 

    //add current game to fetch when game is complete
  }, [currentGame])

  const postNewPlayer = async (newPlayer) => {
      const response = await fetch("http://localhost:8080/players", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newPlayer)
      })
      const savedPlayer = await response.json();
      setAllPlayers([...allPlayers, savedPlayer]);
      setActivePlayer(savedPlayer)
  }

  const createNewGame = async (playerId) => {
    const response = await fetch(`http://localhost:8080/games?playerId=${playerId}`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
    });
    const savedGame = await response.json();
    setCurrentGame(savedGame);
    fetchArtworkInGameByGameId(savedGame.id) 
  }


  const fetchArtworkInGameByGameId = async (gameId) => {
    // gameId is hard-coded for now
    const response = await fetch(`http://localhost:8080/artworksInGame?game_id=${gameId}`)
    const jsonData = await response.json();
    setArtworksInGame(jsonData);
  };

  useEffect(() => {
    console.log(currentGame);  
  }, [currentGame]);


  const fetchGameById = async (gameId) => {
    const response = await fetch(`${SERVER_URL}/games/${gameId}`);
    const jsonData = await response.json();
    setCurrentGame(jsonData);
  };

  const fetchIncompleteGamesForPlayer = async (playerId) => {
    const response = await fetch(`${SERVER_URL}/games?player_id=${playerId}&complete=false`);
    const jsonData = await response.json();
    setIncompleteGamesForPlayer(jsonData);

  };

  // update a penalty etc. in a game (general)
  const updateGame = async (updatedCurrentGame) => {
    const response = await fetch(`${SERVER_URL}/games/${updatedCurrentGame.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedCurrentGame)
      })
    const data = await response.json();
    setCurrentGame(data);
    console.log(currentGame);

  }



  const updateArtworkInGame = async(updatedArtworkInGame) => {
    const response = await fetch(`${SERVER_URL}/artworksInGame/${updatedArtworkInGame.id}?stolen=true`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",}}
    )
    const data = await response.json()
    const updatedArtworksInGame = artworksInGame.map((artworkInGame) => {
      if(artworkInGame.id != updatedArtworkInGame.id){
        return artworkInGame
      } else {
        return data
      }
    })
    console.log(updatedArtworksInGame)
    setArtworksInGame(updatedArtworksInGame)
  }


  const fetchStolenArtwork = async () => {
    const response = await fetch(`${SERVER_URL}/artworksInGame?game_id=${currentGame.id}&stolen=true`)
    const jsonData = await response.json()
    if (Array.isArray(jsonData)) {
      const stolenArtworks = jsonData.map((artworkGame) => artworkGame);
      setStolenArtworkList(stolenArtworks)
      console.log("stolen artwork", stolenArtworks);
    } else {
      setStolenArtworkList(jsonData);
    }
  }

  const handleClickAudio = () => {setIsPlaying((prev) => !prev)}

  const checkAudioPlay = () => {
      if(isPlaying){
          stop()
      }else{play()}
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingContainer
        />
      ),
      children : [
      {
        path:"/",
        element:<LoginContainer postNewPlayer = {postNewPlayer}/>
      },   
      
    
    {
      path: "/playerAccount",
      element: <PlayerContainer  
      createNewGame = {createNewGame}
      activePlayer={activePlayer}
      incompleteGamesForPlayer={incompleteGamesForPlayer}
      fetchIncompleteGamesForPlayer={fetchIncompleteGamesForPlayer}
      currentGame={currentGame}
      fetchGameById={fetchGameById}
      setCurrentGame={setCurrentGame}
      fetchArtworkInGameByGameId = {fetchArtworkInGameByGameId}

      />,
    },
    {
      path: "/gamePage",
      element: <GameContainer
      activePlayer = {activePlayer}
      currentGame={currentGame}
      setCurrentGame={setCurrentGame}
      artworksInGame={artworksInGame}
      updateGame={updateGame}
      updateArtworkInGame={updateArtworkInGame}
      fetchStolenArtwork={fetchStolenArtwork}
      fetchArtworkInGameByGameId={fetchArtworkInGameByGameId}
      stolenArtworkList={stolenArtworkList}
   />,
    
    },
  ]
  }]);

  return (
    <>
      <div className="header">

        <div className="header-title">
          <h1 className="title"> Art Heist</h1>
        </div>

        <div className="audio-image-container">
          {isPlaying ? <button onClick={() =>{
            handleClickAudio();
            checkAudioPlay();}}>
            <img className="audio-icon" src={audioOn} width={35} height={35}/></button> 
            : <button onClick={() =>{
            handleClickAudio();
            checkAudioPlay();}}>
            <img className="audio-icon" src={audioMute} width={35} height={35}/></button>}
        </div>

      </div>

    <UserContext.Provider value={{ activePlayer, setActivePlayer, allPlayers , newPlayer, postNewPlayer, createNewGame, fetchPlayerById, setNewPlayer, fetchArtworkInGameByGameId, setAllCompletedGamesForPlayer, allCompletedGamesForPlayer, play, stop, isPlaying, setIsPlaying}}>
      
      <RouterProvider router={router}/>

    </UserContext.Provider>
    </>
  );
}

export default App;
