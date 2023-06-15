import "../CSSfiles/InstructionModal.css";

const InstructionModal = ({closeModal}) => {
    return ( 
        <div className="instructionModalBackground">
        <div className="modalContainer">
          <div className="titleClostBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
  
          <div className="title">
            <h2>Instructions</h2>
            <p><strong>1.</strong>Walk up to an artwork and click the info<br/> to answer an art history question</p>
            <p><strong>2.</strong>Rarer paintings get more points... <br/> but the questions are harder</p>
            <p><strong>3.</strong>Watch out for lasers and the guards.<br/> They'll slow you down.</p>
            <p><strong>4.</strong>Set off 3 alarms and you lose</p>
            <p><strong>5.</strong>Steal 10 paintings and you win</p>
            <h3>Keys</h3>
            <ul className="directions">
                <li>Arrow keys to move</li>
                <li>Approach painting to display info</li>
                <li>Spacebar to open question</li>
            </ul>
            <h3>Rules</h3>
            
              <ul className="directions">
                <li>Easy question, Common painting, </li>
                <li>Medium question, Rare painting</li>
                <li>Hard question, Legendary painting</li>
              </ul>

              <h3>Good luck!</h3>
            
          </div>
        </div>
      </div>
     );
}
 
export default InstructionModal;