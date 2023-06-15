import { useContext, useState, useEffect } from "react"; 

import { UserContext } from "../App";
import "../CSSfiles/LeaderBoard.css"


const PersonalLeaderBoardComponent = () => {

    const { activePlayer, currentGame , allCompletedGamesForPlayer} = useContext(UserContext);

    const sortedScores = allCompletedGamesForPlayer
    .filter((game) => game.complete === true)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);


//     const completedGamesForPlayer = activePlayer.games.filter((game) => game.complete === true);
//     const sortedScoresForPlayer = completedGames.sort((a, b) => b.score - a.score).slice(0, 10);
    
//     const PersonalHighestBoard = sortedScoresForPlayer.map((game) => {
//   return {
//     id: game.id,
//     score: game.score
//   };
// }).map(game => <li><p> Game id {game.id} - Score {game.score}</p></li> )

// useEffect(() => {
//    fetchAllCompletedGamesForPlayer(activePlayer.id)  
//   }, [currentGame]);



  
  return (     
    <div className="leadboard">

      <h2>Top 5 Game Scores</h2>
      <div className="score-list">
      
        {sortedScores.map((game) => (
          <li>
          <p className="score-entry" key={game.id}>
            Game id: {game.id} - Score: {game.score}
          </p></li>
        ))}
      </div>
    </div>  
  );
}
 
export default PersonalLeaderBoardComponent;