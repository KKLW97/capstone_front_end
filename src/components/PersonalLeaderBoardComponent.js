import { useContext} from "react"; 

import { UserContext } from "../App";
import "../CSSfiles/LeaderBoard.css"


const PersonalLeaderBoardComponent = () => {

    const { allCompletedGamesForPlayer } = useContext(UserContext);

    // get all completed games for active player, sort and return top 5 best scores
    const sortedScores = allCompletedGamesForPlayer
    .map((game) => game)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);


  
  return (     
    <div className="leadboard">

      <h2>Top 5 Game Scores</h2>
      <div className="score-list">
      
        {sortedScores.map((game) => (
          <li>
          <p className="score-entry" key={game.id}>
            Game id {game.id} - {game.score} points
          </p></li>
        ))}
      </div>
    </div>  
  );
}
 
export default PersonalLeaderBoardComponent;