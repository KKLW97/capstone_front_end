import { useState } from "react";
import "../CSSfiles/Login.css";

const LoginModal = ({ closeModal, postNewPlayer, allPlayers }) => {
  const [newPlayer, setNewPlayer] = useState("");
  const [erroMessage, setErrorMessage] = useState("");

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
      setTimeout(() => {
          closeModal(false);
      }, 500)
    
    } else {
      setErrorMessage(
        "Username has been taken exists. Please choose a different name."
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
          <h1> Enter your name to register </h1>
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
