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


  const [activePlayer, setActivePlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);

  // initialise context for different states
  



  // get all players 
  const fetchAllPlayers = async () => {
      const response = await fetch("http://localhost:8080/players");
      const jsonData = await response.json();
      setAllPlayers(jsonData)
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
    <UserContext.Provider value={{ activePlayer, setActivePlayer, allPlayers , newPlayer, postNewPlayer }}>

      <Navbar />
      <RouterProvider router={router} />

    </UserContext.Provider>

    </>
  );
}

export default App;
