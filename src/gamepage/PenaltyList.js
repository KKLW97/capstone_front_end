import PenaltyComponent from "./PenaltyComponent";
import "../CSSfiles/PenaltyList.css"
const PenaltyList = ({currentGame}) => {

    // const setOffAlarm = () =>{
    //     if(currentGame.penalty ){

    //     }
    // }    

    return ( 
        <div className="penalty-list-container"> 
        <section className="penalty-list">
            {currentGame.penalty == 0 ? <> <PenaltyComponent id="alarm1" className="alarm-off"/> <PenaltyComponent id="alarm2" className="alarm-off"/><PenaltyComponent id="alarm3" className="alarm-off"/></>
            : currentGame.penalty == 1 ? <> <PenaltyComponent id="alarm1" className="alarm-on"/> <PenaltyComponent id="alarm2" className="alarm-on"/><PenaltyComponent id="alarm3" className="alarm-off"/></> 
            : currentGame.penalty==2 ? <> <PenaltyComponent id="alarm1" className="alarm-on"/> <PenaltyComponent id="alarm2" className="alarm-on"/><PenaltyComponent id="alarm3" className="alarm-off"/></>
            : currentGame.penalty==3 ? <> <PenaltyComponent id="alarm1" className="alarm-on"/> <PenaltyComponent id="alarm2" className="alarm-on"/><PenaltyComponent id="alarm3" className="alarm-on"/></>
            :null}
        </section>
        </div>
     );
}
 
export default PenaltyList;