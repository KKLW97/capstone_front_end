// import "./App.css";
import GameContainer from "./gamepage/GameContainer";
import LandingContainer from "./homepage/LandingContainer";

//react router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerContainer from "./containers/PlayerContainer";
import LoginContainer from "./homepage/LoginContainer";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {

  const [activePlayer, setActivePlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
 
  const [currentGame, setCurrentGame] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);

  const [artworksInGame, setArtworksInGame] = useState([]);

  const [artworksInGameList, setArtworksInGameList] = useState([]);



  const [allPlayers, setAllPlayers] = useState([]);
  // get all players 
  const fetchAllPlayers = async () => {
      const response = await fetch("http://localhost:8080/players");
      const data = await response.json();
      setAllPlayers(data)
  }
  useEffect(() => {
    fetchAllPlayers();
  }, [])



  const postNewPlayer = async (newPlayer) => {
      const response = await fetch("http://localhost:8080/players", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newPlayer)
      })
      const savedPlayer = await response.json();
      setAllPlayers([...allPlayers, savedPlayer]);
  }


  // fetch all the player data
  const fetchPlayers = async () => {
    const response = await fetch("http://localhost:8080/players");
    const jsonData = await response.json();
    setAllPlayers(jsonData);
  };


  // get player by id 
    const fetchPlayerById = async (playerId) => {
      const response = await fetch(`http://localhost:8080/players/${playerId}`)
      const jsonData = await response.json();
      setActivePlayer(jsonData);
    };


  //called function when page loads
  useEffect(() => {
    fetchPlayers();
    fetchPlayerById(2);
  }, []);


  // get artworks in game by game id 
  const fetchArtworkInGameByGameId = async () => {
    const response = await fetch("http://localhost:8080/artworksInGame?game_id=2")
    const jsonData = await response.json();
    console.log(jsonData); // Check the retrieved data in the browser console
    setArtworksInGame(jsonData);
  };

  useEffect(() => {
  
    fetchArtworkInGameByGameId();
  }, []);

  const fetchGameForPlayer = async () => {
    const response = await fetch("http://localhost:8080/games/2");
    const jsonData = await response.json();
    setCurrentGame(jsonData);
  };
  
  useEffect(() => {
    fetchGameForPlayer();
  }, []);





  // const mapArtworksIngGame = artworksInGame.map((artworkInGame , index) => 
  //       { return (key=index , artworkInGame)});
  // setArtworksInGameList(mapArtworksIngGame);
  // console.log(artworksInGameList);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingContainer
        allPlayers = {allPlayers} 
        newPlayer = {newPlayer}
        activePlayer = {activePlayer} 
       

        />
      ),
      children: [
        {
          path:"/logIn",
          element: (
            <LoginContainer
            allPlayers = {allPlayers} 
            newPlayer = {newPlayer}
            activePlayer = {activePlayer} 
            postNewPlayer={postNewPlayer}
            />
          ),
        },
      ],
    },
    {
      path: "playersAccount",
      element: <PlayerContainer 
      currentGame={currentGame}
      isNewGame={isNewGame}
      setIsNewGame={setIsNewGame}
      />,
    },
    {
      path: "gamePage",
      element: <GameContainer
      activePlayer = {activePlayer}
      currentGame={currentGame}
      setCurrentGame={setCurrentGame} 
      artworksInGame = {artworksInGame} />,
    },
  ]);

  return (
    <>
      {/* <LandingContainer />
    <GameContainer /> */}
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
