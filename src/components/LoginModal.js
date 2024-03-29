import { useState, useContext} from "react";
import "../CSSfiles/Login.css";

import { UserContext } from "../App";

import { useNavigate } from "react-router-dom";

const LoginModal = ({ closeModal }) => {
  

  const [erroMessage, setErrorMessage] = useState("");


  const { allPlayers, postNewPlayer, newPlayer, setNewPlayer } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewPlayer(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const existingPlayer = allPlayers.find(
      (player) => player.name === newPlayer
    );

    if (!existingPlayer) {
      await postNewPlayer(newPlayer);
      navigate("/playerAccount");
    
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

        <div className="titleWrapper">
          <h1 className="title"> Enter your username to register </h1>
        </div>
        <div className="body">
          <input
            className="textboxid"
            type="text"
            placeholder="enter your name"
            name="name"
            value={newPlayer}
            onChange={handleChange}
          />
        </div>
        {erroMessage}
        <div className="modalFooter">
          <button onClick={() => closeModal(false)} className="cancelBtn">Cancel</button>
          
          <button className="registerBtn" onClick={handleClick}> Register </button>
         
        </div>
      </div>
      </div>
  );
};

export default LoginModal;
