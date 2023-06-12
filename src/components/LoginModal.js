import { useState, useContext} from "react";
import "../CSSfiles/Login.css";

import { UserContext } from "../App";

import { useNavigate } from "react-router-dom";

const LoginModal = ({ closeModal }) => {
  
  const [newPlayerToBeAdded, setNewPlayerToBeAdded] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [confirmationMessage] = useState("Your username has now been registered");

  const { allPlayers, postNewPlayer, setActivePlayer} = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewPlayerToBeAdded(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const existingPlayer = allPlayers.find(
      (player) => player.name === newPlayerToBeAdded
    );

    if (!existingPlayer) {
      postNewPlayer(newPlayerToBeAdded);
      setActivePlayer(newPlayerToBeAdded);
      // navigate("/playerAccount");
    
    } else {
      setErrorMessage(
        "Username has been taken. Please choose a different name."
      );
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleClostBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>

        <div className="title">
          <h1> Enter your username to register </h1>
        </div>
        <div className="body">
          <input
            className="textboxid"
            type="text"
            placeholder="enter your name"
            name="name"
            value={newPlayerToBeAdded}
            onChange={handleChange}
          />
        </div>
        {erroMessage}
        <div className="footer">
          <button onClick={() => closeModal(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={handleClick}> Register </button>
         
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
