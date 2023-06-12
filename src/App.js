// import "./App.css";
import GameContainer from "./gamepage/GameContainer";
import LandingContainer from "./homepage/LandingContainer";

//react router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerContainer from "./containers/PlayerContainer";
import LoginContainer from "./homepage/LoginContainer";
import Navbar from "./components/Navbar";
import { useEffect, useState, createContext, useContext } from "react";

export const UserContext = createContext();

function App() {


  const [allPlayers, setAllPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState("");
  const [newPlayer, setNewPlayer] = useState("");
  const [currentGame, setCurrentGame] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);
  

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
    // fetchPlayerById(1);
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

  // const fetchGameForPlayer = async () => {
  //   const response = await fetch("http://localhost:8080/games/2");
  //   const jsonData = await response.json();
  //   setCurrentGame(jsonData);
  // };
  
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
      activePlayer={activePlayer}
      />,
    },
    {
      path: "gamePage",
      element: <GameContainer
      activePlayer = {activePlayer}
   />,
    },
  ]);

  return (
    <>
      {/* <LandingContainer />
    <GameContainer /> */}
    <UserContext.Provider value={{ activePlayer, setActivePlayer, allPlayers , newPlayer, postNewPlayer , fetchPlayerById }}>

      <Navbar />
      <RouterProvider router={router} />

    </UserContext.Provider>

    </>
  );
}

export default App;
