import "./App.css";
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
  const [allPlayers, setAllPlayers] = useState([]);
  const [game, setGame] = useState(null);
  const [isNewGame, setIsNewGame] = useState(false);



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
    fetchPlayerById(3);
  }, []);


















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
            />
          ),
        },
      ],
    },
    {
      path: "playersAccount",
      element: <PlayerContainer 
      game={game}
      isNewGame={isNewGame}
      setIsNewGame={setIsNewGame}
      />,
    },
    {
      path: "gamePage",
      element: <GameContainer
      activePlayer = {activePlayer}
      game={game}
      setGame={setGame} />,
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
