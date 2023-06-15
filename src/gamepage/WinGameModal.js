import { useState, useContext} from "react";
import "../CSSfiles/Login.css";

import { UserContext } from "../App";

import { useNavigate } from "react-router-dom";

const WinGameModal = ({setWinGameModal}) => {

  const navigate = useNavigate();

 

  const handleClick = (event) => {
    event.preventDefault();
    setWinGameModal(false);
    navigate("/playerAccount");
    }
;

  return (
    <div className="LM__background">
      <div className="LM__container">
        <div className="titleClostBtn">
          <button onClick={handleClick}> X </button>
        </div>

        <div>
          <h1 className="LM__title"> You Win!</h1>
        </div>
        
          <button onClick={handleClick} className="LM__button">Back to Account</button>
         
      </div>
    </div>
  );
}
 
export default WinGameModal;