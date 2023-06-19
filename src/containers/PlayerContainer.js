import { useNavigate } from "react-router-dom";

import { useEffect, useState, useContext } from 'react'
import "../CSSfiles/PlayerContainer.css"
import { UserContext } from "../App";
import PersonalLeaderBoardComponent from "../components/PersonalLeaderBoardComponent";



const PlayerContainer = ({createNewGame, incompleteGamesForPlayer, fetchIncompleteGamesForPlayer, currentGame, fetchGameById }) => {





const [selectedId, setSelectedId] = useState(null);

const {activePlayer , setAllCompletedGamesForPlayer, play, setIsPlaying} = useContext(UserContext);




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
    play();
    setIsPlaying(true);
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
    play();
    setIsPlaying(true);
    navigate("/gamePage")
}

const handleGameChange = (event) => {
    setSelectedId(event.target.value);
 
}

useEffect(() => {
    fetchIncompleteGamesForPlayer(activePlayer.id)
  }, [activePlayer])

 


    return ( 
        <>
        <h1 className="player-title"> Welcome {activePlayer.name}!! </h1>
        <div className="player-game">
            <h3>Please create new game or select existing game</h3>
            <div className="new-game">
                <button className="player-button" onClick={handleClick}>Create New Game</button>
            </div>
            <div className="select-game">
                <form onSubmit={handleFormSubmit}>
                    <select className="select" onChange={handleGameChange}>
                        <option disabled-value="Select-existing-game">Select Existing Game</option>
                        {incompleteGameList}
                    </select>
                    <button className="player-button" type="submit" >Load Game</button>
                </form>
            </div>

        <PersonalLeaderBoardComponent />
        </div>

        </>
     );
}
 
export default PlayerContainer;