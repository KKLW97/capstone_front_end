import { useContext, useState, useEffect } from "react"; 

import { UserContext } from "../App";

const LeaderBoardComponent = () => {

    const { allPlayers } = useContext(UserContext);
    

const playersHighestScores = allPlayers.filter((player) => {
    // console.log( player.games.filter((game) => game.complete === true).length!==0);
    return player.games.filter((game) => game.complete === true).length !==0})
.map((player) =>{
    // console.log(Math.max(0, ...player.games.filter((game) => game.complete===true).map((game) => game.score)))
    return {
        name: player.name, 
        highestScore: Math.max(0, ...player.games.filter((game) => game.complete===true).map((game) => game.score))
    }
    
})
.sort((a,b) => b.highestScore - a.highestScore)
.map((player) =>  <li> <p>{player.name} - {player.highestScore}</p></li>)

console.log(playersHighestScores);
    
    return ( 
        <>
        <h2> Top 10 players </h2>
        <ol>

            {playersHighestScores}
        </ol>
        
        
     

      
        
        </>
     );
}
 
export default LeaderBoardComponent;