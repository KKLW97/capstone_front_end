import { useNavigate } from "react-router-dom";

import { useEffect, useState, useContext } from 'react'

import { UserContext } from "../App";
import PersonalLeaderBoardComponent from "../components/PersonalLeaderBoardComponent";

const PlayerContainer = ({createNewGame, incompleteGamesForPlayer, fetchIncompleteGamesForPlayer, currentGame, fetchGameById, setCurrentGame, fetchArtworkInGameByGameId  }) => {


import "../CSSfiles/PlayerContainer.css"


const [selectedId, setSelectedId] = useState(null);

const {activePlayer , allCompletedGamesForPlayer, setAllCompletedGamesForPlayer} = useContext(UserContext);




const fetchAllCompletedGamesForPlayer = async (playerId) => {
    const response = await fetch(`http://localhost:8080/games?player_id=${playerId}&complete=true`);
    const jsonData = await response.json();
    setAllCompletedGamesForPlayer(jsonData);
  }



  useEffect(() => {
    fetchAllCompletedGamesForPlayer(activePlayer.id); 
   }, [currentGame]);


console.log(activePlayer);

const handleClick = async() => {
    await createNewGame(activePlayer.id);
    console.log(activePlayer)
    navigate("/gamePage");
}

const navigate = useNavigate();

const incompleteGameList = incompleteGamesForPlayer.map((incompleteGame) => {
    return (
    <option key={incompleteGame.id} value={incompleteGame.id}>
          game id {incompleteGame.id}  </option>
    )
});

const handleFormSubmit = async (event) => {
    event.preventDefault()
    await fetchGameById(selectedId)
    // await fetchArtworkInGameByGameId(selectedId); 
    navigate("/gamePage")
}

const handleGameChange = (event) => {
    setSelectedId(event.target.value);
 
}

useEffect(() => {
    fetchIncompleteGamesForPlayer(activePlayer.id)
  }, [activePlayer])

 
// const handleSelect = () => {
    // fetchIncompleteGamesForPlayer(activePlayer.id)
// }

    return ( 
        <>
        <h1 className="player-title"> Welcome {activePlayer.name}!! </h1>
        <h3>Please create new game or select existing game</h3>
        <button className="buttonStyling" onClick={handleClick}>Create New Game</button>
        <form onSubmit={handleFormSubmit}>
            <select onChange={handleGameChange}>
                <option disabled-value="Select-existing-game">Select Existing Game</option>
                {incompleteGameList}
            </select>
            <button className="buttonStyling" type="submit" >Load Game</button>
        </form>
        <h2>Personal best for completed game: </h2>

        <PersonalLeaderBoardComponent />
        </>
     );
}
 
export default PlayerContainer;