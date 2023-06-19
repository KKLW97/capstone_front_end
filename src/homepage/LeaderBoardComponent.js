import { useContext } from "react"; 
import { UserContext } from "../App";
import "../CSSfiles/LeaderBoard.css";

const LeaderBoardComponent = () => {

    const { allPlayers } = useContext(UserContext);
        
    const playersHighestScores = allPlayers.filter(player => player.games.filter(game => game.complete === true).length !==0)
                                            .map(player => {
                                                return {
                                                    name: player.name, 
                                                    highestScore: Math.max(0, ...player.games.filter(game => game.complete===true).map(game => game.score))
                                                }
                                            })
                                            .sort((a,b) => b.highestScore - a.highestScore)
                                            .slice(0, 5)
                                            .map(player => <li> <p className="score-entry">{player.name} - {player.highestScore} points </p></li>)
        
    return ( 
        <div className="landingleadboard">
            <h2> Top 5 players </h2>
            <div className="score-list">
                {playersHighestScores}
            </div>
        </div>
    );
}
 
export default LeaderBoardComponent;