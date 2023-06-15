import { useContext, useState, useEffect } from "react"; 

import { UserContext } from "../App";


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

    <>

    <div>

<h1>Top 5 Game Scores</h1>
     
      <ul>
        {sortedScores.map((game) => (
          <li key={game.id}>
            <p>
              Game id: {game.id} - Score: {game.score}
            </p>
          </li>
        ))}
      </ul>
    </div>
   
    
    
    </> );
}
 
export default PersonalLeaderBoardComponent;