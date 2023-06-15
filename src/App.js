// import "./App.css";
import GameContainer from "./gamepage/GameContainer";
import LandingContainer from "./homepage/LandingContainer";

//react router imports
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import PlayerContainer from "./containers/PlayerContainer";
import LoginContainer from "./homepage/LoginContainer";
import Navbar from "./components/Navbar";
import { useEffect, useState, createContext, useContext } from "react";

// footer image imports
import github from "./assets/github.png"
import instagram from "./assets/instagram.png"
import linkedin from "./assets/linkedin.png"
import twitter from "./assets/twitter.png"

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

  const year = new Date().getFullYear();

  // fetch all completed games for all players to be used for the leaderboard
  // const fetchAllCompletedGamesForAllPlayers = async () => {
  //   const response = await fetch("http://localhost:8080/games?complete=true");
  //   const jsonData = await response.json();
  //   setAllCompleteGames(jsonData);
  // }



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
    // const artworks = jsonData.map((artworkGame) => artworkGame);
    setArtworksInGame(jsonData);
    
    
    // const artworks = await jsonData.map((artworkGame)=> 
    // { return artworkGame.artwork})
    // setArtworksInGame(artworks);
    // console.log(artworks);
  };

  useEffect(() => {
    console.log(currentGame);  
  }, [currentGame]);



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
    // fetchGameById(data.id);
    console.log(currentGame);

  }


  // updateArtworkInGame
//   const updateArtworkInGame = (updatedArtworkInGame) => {
//     fetch(`${SERVER_URL}/artworksInGame/${updatedArtworkInGame.id}?stolen=true`, {
//           method: "PATCH",
//           headers: {"Content-Type": "application/json",}}
//     )
//     .then ((response) => response.json())
//     .then ((jsonData) => {
//           const updatedArtworksInGame = artworksInGame.map((artworkInGame) => {
//             if(artworkInGame.id != updatedArtworkInGame.id){
//               return artworkInGame
//             } else {
//               return jsonData
//             }
//           })
//           console.log(updatedArtworksInGame)
//           setArtworksInGame(updatedArtworksInGame)
//     })
// }

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
      {/* <LandingContainer />
    <GameContainer /> */}

      <h1 className="title"> Art Heist</h1>

    <UserContext.Provider value={{ activePlayer, setActivePlayer, allPlayers , newPlayer, postNewPlayer, createNewGame, fetchPlayerById, setNewPlayer, fetchArtworkInGameByGameId, setAllCompletedGamesForPlayer, allCompletedGamesForPlayer}}>


      
      
      <RouterProvider router={router}/>
      

    </UserContext.Provider>
    <div className="footer">
            <div className="footer-left">
                <h2 className="footer-headers">Useful Links:</h2>
                <ul className="footer-nav-list">
                    <li className="">
                    <div className="nav-text">
                    <a href="http://localhost:3000" className="#">Home</a></div>
                    </li>
                    <li className="">
                    <div className="nav-text">
                    <a href="http://localhost:3000/playerAccount" className="#">Account</a></div>
                    </li>
                    <li className="">
                    <div className="nav-text">
                    <a href="http://localhost:3000/gamePage" className="#">Game</a></div>
                    </li>
                </ul>
            </div>
            <div className="footer-right">
                <h2 className="footer-headers">Connect With Us</h2>
                <div className="footer-right-images">
                    <img className="social-icons" src={github} width={50} height={50}/>
                    <img className="social-icons" src={twitter} width={50} height={50}/>
                    <img className="social-icons" src={linkedin} width={50} height={50}/>
                    <img className="social-icons" src={instagram} width={50} height={50}/>
                </div>
            </div>
            <div className="footer-bottom">
              <h5 className="footer-copyright">{`Copyright © The Gallery Bandits ${year}`}</h5>
            </div>
        </div>
    </>
  );
}

export default App;
