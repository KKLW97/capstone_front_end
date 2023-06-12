import { useNavigate } from "react-router-dom";
const PlayerContainer = ({ activePlayer, createNewGame }) => {



const handleClick = () => {
    createNewGame(activePlayer.id);
    console.log(activePlayer)
    navigate("/gamePage");
}

const navigate = useNavigate();
 

    return ( 
        <>
        <h1> This is the player's account !! </h1>
        <button onClick={handleClick}>New Game</button>
        </>
     );
}
 
export default PlayerContainer;