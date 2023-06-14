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
            <p>need to think about the content that goes here </p>

            <p><strong>Easy</strong> question, <strong>Common</strong> painting, </p>
            <p><strong>Medium</strong> question, <strong>Rare</strong> painting</p>
            <p><strong>Hard</strong> question, <strong>Legendary</strong> painting</p>
          </div>
        </div>
      </div>
     );
}
 
export default InstructionModal;