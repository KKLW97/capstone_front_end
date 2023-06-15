import { useState, useContext, useNavigate } from "react";
import { UserContext } from "../App";
import "../CSSfiles/App.css";


const QuestionModal = ({closeModal, questionBeingDisplayed, currentQuestion}) => {
    

    
    
    return ( 
        <div className="question__modal--background">
        <div className="question__modal--container">
          <div className="titleClostBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
  
          <div className="question__modal--title">
              {questionBeingDisplayed} 
          </div>
        </div>
      </div>
    );
}
 
export default QuestionModal;