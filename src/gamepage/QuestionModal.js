import "../CSSfiles/App.css";

const QuestionModal = ({closeModal, questionBeingDisplayed, }) => {
    return ( 
      <div className="question__modal--background">
          <div className="question__modal--container">
              <div className="titleClostBtn">
                  <button onClick={() => closeModal(false)} className="MCQbutton"> X </button>
              </div>
              <div className="question__modal--title">
                  {questionBeingDisplayed} 
              </div>
          </div>
      </div>
    );
}
 
export default QuestionModal;