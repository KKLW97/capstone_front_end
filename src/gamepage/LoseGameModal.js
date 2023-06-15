import { useState, useContext} from "react";
import "../CSSfiles/Login.css";

import { UserContext } from "../App";

import { useNavigate } from "react-router-dom";

const LoseGameModal = ({setLoseGameModal}) => {
   // const [newPlayerToBeAdded, setNewPlayerToBeAdded] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [confirmationMessage] = useState("Your username has now been registered");

  const { allPlayers, postNewPlayer, setActivePlayer, newPlayer, setNewPlayer} = useContext(UserContext);

  const navigate = useNavigate();

 

  const handleClick = (event) => {
    event.preventDefault();
    setLoseGameModal(false);
    navigate("/");
    }
;

  return (
    <div className="LM__background">
      <div className="LM__container">
        <div className="titleClostBtn">
          <button onClick={handleClick}> X </button>
        </div>

        <div>
          <h1 className="LM__title"> You Lose!</h1>
        </div>
        
          <button onClick={handleClick} className="LM__button">Back to home</button>
         
      </div>
    </div>
  );
};

 
export default LoseGameModal;