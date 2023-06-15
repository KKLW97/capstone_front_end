import "../CSSfiles/InstructionModal.css";

const InstructionModal = ({closeModal}) => {
    return ( 
        <div className="instructionModalBackground">
        <div className=" modalContainer">
          <div className="titleClosetBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
  
          <div className="instructionTitle">
            <h2>Instructions</h2>
            <p><strong>1.</strong>Walk up to an artwork and answer an art history question to steal it</p>
            <p><strong>2.</strong>Rarer paintings get more points...but the questions are harder</p>
            <p><strong>3.</strong>Watch out for lasers and the guards. They'll slow you down.</p>
            <p><strong>4.</strong>Set off 3 alarms and you lose</p>
            <p><strong>5.</strong>Steal 10 paintings and you win</p>
            <h3>Keys</h3>
            <ul className="directions">
                <li className="instructionList">Arrow keys to move</li>
                <li className="instructionList">Approach painting to display info</li>
                <li className="instructionList">Spacebar to open question</li>
            </ul>
            <h3>Rules</h3>
            
              <ul className="directions">
                <li className="instructionList">Easy question, Common painting, </li>
                <li className="instructionList">Medium question, Rare painting</li>
                <li className="instructionList">Hard question, Legendary painting</li>
              </ul>

              <h3>Good luck!</h3>
            
          </div>
        </div>
      </div>
     );
}
 
export default InstructionModal;