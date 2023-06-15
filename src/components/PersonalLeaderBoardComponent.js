import { useContext, useState, useEffect } from "react"; 

import { UserContext } from "../App";


const PersonalLeaderBoardComponent = () => {

    const { activePlayer } = useContext(UserContext);

    const completedGames = activePlayer.games.filter((game) => game.complete === true);
    const sortedScoresForPlayer = completedGames.sort((a, b) => b.score - a.score);
    const PersonalHighestBoard = sortedScoresForPlayer.map((game) => {
  return {
    id: game.id,
    score: game.score
  };
}).map(game => <li><p> Game id {game.id} - Score {game.score}</p></li> )
    

  
    return (     

    <>
    {PersonalHighestBoard }
    
    
    </> );
}
 
export default PersonalLeaderBoardComponent;