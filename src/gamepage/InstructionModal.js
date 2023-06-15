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
            <p><strong>Answer a question about art in order to steal a painting</strong></p>
            <p><strong>More points for a higher value painting</strong></p>
            <p><strong>Set off 3 alarms and you lose</strong></p>
            <p><strong>Steal 10 paintings and you win</strong></p>
            <h3>Keys</h3>
            <ul>
                <li>Arrow keys to move</li>
                <li>Spacebar to open question</li>
                <li>Approach painting to display info</li>
            </ul>
            <h3>Rules</h3>
            
              <ul>
                <li>Easy question, Common painting, </li>
                <li>Medium question, Rare painting</li>
                <li>Hard question, Legendary painting</li>
              </ul>
            
          </div>
        </div>
      </div>
     );
}
 
export default InstructionModal;