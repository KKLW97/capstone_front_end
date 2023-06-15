import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
const PlayerContainer = ({ activePlayer, createNewGame, incompleteGamesForPlayer, fetchIncompleteGamesForPlayer, currentGame, fetchGameById, setCurrentGame, fetchArtworkInGameByGameId  }) => {

const [selectedId, setSelectedId] = useState(null);

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
        <h1> This is the player's account !! </h1>
        <button className="buttonStyling" onClick={handleClick}>New Game</button>
        <form onSubmit={handleFormSubmit}>
            <select onChange={handleGameChange}>
                <option disabled-value="Select-existing-game">Select Existing Game</option>
                {incompleteGameList}
            </select>
            <button className="buttonStyling" type="submit" >Load Game</button>
        </form>
        </>
     );
}
 
export default PlayerContainer;