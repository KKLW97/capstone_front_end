import { useState, useContext} from "react";
import "../CSSfiles/Login.css";

import { UserContext } from "../App";

import { useNavigate } from "react-router-dom";

const LoseGameModal = (setLoseGameModal) => {
   // const [newPlayerToBeAdded, setNewPlayerToBeAdded] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [confirmationMessage] = useState("Your username has now been registered");

  const { allPlayers, postNewPlayer, setActivePlayer, newPlayer, setNewPlayer} = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewPlayer(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const existingPlayer = allPlayers.find(
      (player) => player.name === newPlayer
    );

    if (!existingPlayer) {
      postNewPlayer(newPlayer);
      // setActivePlayer(newPlayer);
      navigate("/playerAccount");
    
    } else {
      setErrorMessage(
        "Username has been taken. Please choose a different name."
      );
    }
  };

  return (
    <div className="LM__background">
      <div className="modalContainer">
        <div className="titleClostBtn">
          <button onClick={() => setLoseGameModal(false)}> X </button>
        </div>

        <div className="title">
          <h1> You Lose!</h1>
        </div>
        <div className="footer">
          <button onClick={() => setLoseGameModal(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={handleClick}> Register </button>
         
        </div>
      </div>
    </div>
  );
};

 
export default LoseGameModal;