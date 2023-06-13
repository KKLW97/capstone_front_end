import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
const PlayerContainer = ({ activePlayer, createNewGame, incompleteGamesForPlayer, fetchIncompleteGamesForPlayer, currentGame, fetchGameById, setCurrentGame, fetchArtworkInGameByGameId,  }) => {



const handleClick = () => {
    createNewGame(activePlayer.id);
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

const handleFormSubmit = (event) => {
    event.preventDefault()
    fetchGameById(parseInt(currentGame))
    navigate("/gamePage")
}

const handleGameChange = (event) => {
    const selectedGame = event.target.value;
    setCurrentGame(selectedGame)
    fetchArtworkInGameByGameId(selectedGame.id)  
}

useEffect(() => {
    fetchIncompleteGamesForPlayer(activePlayer.id)
  }, [activePlayer])

 
// const handleSelect = () => {
    // fetchIncompleteGamesForPlayer(activePlayer.id)
// }

    return ( 
        <>
        <h1> This is the player's account !! </h1>
        <button onClick={handleClick}>New Game</button>
        <form onSubmit={handleFormSubmit}>
            <select onChange={handleGameChange}>
                <option disabled-value="Select-existing-game">Select Existing Game</option>
                {incompleteGameList}
            </select>
            <button type="submit" >Load Game</button>
        </form>
        </>
     );
}
 
export default PlayerContainer;