// import "./App.css";
import GameContainer from "./gamepage/GameContainer";
import LandingContainer from "./homepage/LandingContainer";

//react router imports
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import PlayerContainer from "./containers/PlayerContainer";
import LoginContainer from "./homepage/LoginContainer";
import Navbar from "./components/Navbar";
import { useEffect, useState, createContext, useContext } from "react";

export const UserContext = createContext();

function App() {


  const [allPlayers, setAllPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [currentGame, setCurrentGame] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);
  const [incompleteGamesForPlayer, setIncompleteGamesForPlayer] = useState([]);
  const [allGamesForPlayer, setAllGamesForPlayer] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [allCompleteGames, setAllCompleteGames] = useState([]);
  const [artworksInGame, setArtworksInGame] = useState([]);
  const [artworkInGame, setArtworkInGame] = useState([]);

  

  // initialise context for different states
  



  // get all players 
  const fetchAllPlayers = async () => {
      const response = await fetch("http://localhost:8080/players");
      const jsonData = await response.json();
      setAllPlayers(jsonData)
  }
  // fetch all the player data
  // const fetchPlayers = async () => {
  //   const response = await fetch("http://localhost:8080/players");
  //   const jsonData = await response.json();
  //   setAllPlayers(jsonData);
  // };

  // get player by id 
  const fetchPlayerById = async (playerId) => {
    const response = await fetch(`http://localhost:8080/players/${playerId}`)
    const jsonData = await response.json();
    setActivePlayer(jsonData);
  };


  //called function when page loads
  useEffect(() => {
    fetchAllPlayers();  
    fetchPlayerById(1);
  }, [])

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
    if (Array.isArray(jsonData)) {
      const artworks = jsonData.map((artworkGame) => artworkGame.artwork);
      setArtworksInGame(artworks);
      console.log(artworks);
    } else {
      console.log("Invalid data received:", jsonData);
    }
    // const artworks = await jsonData.map((artworkGame)=> 
    // { return artworkGame.artwork})
    // setArtworksInGame(artworks);
    // console.log(artworks);
  };

  useEffect(() => {
    currentGame && fetchArtworkInGameByGameId(parseInt(currentGame?.id));
  }, [currentGame]);


  // update a penalty in a game 

  const updateGame = (game) => {
    fetch(`${SERVER_URL}/games/${game.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(game)
    })
    .then((response) => response.json())
    .then((responseGame) => {

      const updatedGameList = activePlayer.games.map((game) => {
        if(game.id === responseGame.id){
          return responseGame;
        }else{
          return game;
        }
      })
      setGames(updatedGameList);
    })
    setGameToUpdate(null);
  }

    // patch request for artwork in game

    const updateArtworkInGame = (updatedArtworkInGame) => {
        fetch(`${SERVER_URL}/artworkInGame/${artworkInGame.id}`, {
              method: "PATCH",
              headers: {"Content-Type": "application/json",}}
        )
        .then ((response) => response.json())
        .then ((jsonData) => {
              const artworkInGameToKeep = artworksInGame.filter((artworkInGame) => 
              artworkInGame.id != updatedArtworkInGame)
              setArtworksInGame([...artworkInGameToKeep, jsonData])
        })
        setArtworkInGameToUpdate(null);
    }

  // get artworks in game by game id 
  // const fetchArtworkInGameByGameId = async () => {
  //   const response = await fetch("http://localhost:8080/artworksInGame?game_id=2")
  //   const jsonData = await response.json();
  //   console.log(jsonData); // Check the retrieved data in the browser console
  //   setArtworksInGame(jsonData);
  // };

  // useEffect(() => {
  //   fetchArtworkInGameByGameId();
  // }, []);

  const fetchGameById = async (gameId) => {
    const response = await fetch(`http://localhost:8080/games/${gameId}`);
    const jsonData = await response.json();
    setCurrentGame(jsonData);
  };

  const fetchIncompleteGamesForPlayer = async (playerId) => {
    const response = await fetch(`http://localhost:8080/games?player_id=${playerId}&complete=false`);
    const jsonData = await response.json();
    setIncompleteGamesForPlayer(jsonData);

  };


  
  // useEffect(() => {
  //   fetchGameForPlayer();
  // }, []);





  // const mapArtworksIngGame = artworksInGame.map((artworkInGame , index) => 
  //       { return (key=index , artworkInGame)});
  // setArtworksInGameList(mapArtworksIngGame);
  // console.log(artworksInGameList);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingContainer
        />
      )
    },
    {
      path: "playerAccount",
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
      path: "gamePage",
      element: <GameContainer
      activePlayer = {activePlayer}
      currentGame={currentGame}
      artworksInGame={artworksInGame}
   />,
    },
  ]);

  return (
    <>
      {/* <LandingContainer />
    <GameContainer /> */}
    <UserContext.Provider value={{ activePlayer, setActivePlayer, allPlayers , newPlayer, postNewPlayer, createNewGame, fetchPlayerById, setNewPlayer, fetchArtworkInGameByGameId }}>

      <Navbar />
      <RouterProvider router={router} />

    </UserContext.Provider>

    </>
  );
}

export default App;
