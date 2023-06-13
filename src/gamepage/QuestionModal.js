import { useState, useContext, useNavigate } from "react";
import { UserContext } from "../App";


const QuestionModal = ({closeModal, questionBeingDisplayed}) => {
    
    // const [newPlayerToBeAdded, setNewPlayerToBeAdded] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [confirmationMessage] = useState("Your username has now been registered");

  const { allPlayers, postNewPlayer, setActivePlayer, newPlayer, setNewPlayer} = useContext(UserContext);

//   const navigate = useNavigate();

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
    //   navigate("/playerAccount");
    
    } else {
      setErrorMessage(
        "Username has been taken. Please choose a different name."
      );
    }
  };
    
    
    
    return ( 
        <div className="questionModalBackground">
        <div className="modalContainer">
          <div className="titleClostBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
  
          <div className="title">
            <div> {questionBeingDisplayed} </div>
          </div>
        </div>
      </div>
    );
}
 
export default QuestionModal;