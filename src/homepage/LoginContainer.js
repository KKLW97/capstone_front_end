import LoginModal from "../components/LoginModal";
import "../CSSfiles/Login.css";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

import LeaderBoardComponent from "./LeaderBoardComponent";
import StoryComponent from "./StoryComponent";



const LoginContainer = () => {
  
  const [openRegisterModal, setRegisterModal] = useState(false);

  const {allPlayers, setActivePlayer , fetchPlayerById } = useContext(UserContext);

  const existingPlayers = allPlayers.map((player) => <option key={player.id} value={player.id}>{player.name} (id {player.id})</option>);

  const handlePlayerSelection = (event) => {
    const selectedPlayer = event.target.value;
    setActivePlayer(selectedPlayer); 
    fetchPlayerById(parseInt(selectedPlayer));
  };

  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate("/playerAccount");
  };

  return (
    <div className="background">
      
      <h2 className="loginTitle">Steal the Art. Leave No Trace</h2>
      
      <div className="newPlayer">
          <h3 className="h3S"> New Player? </h3>
          <button className="buttonStyling" onClick={() => {setRegisterModal(true)}}>Register</button>
      </div>
      
      <form onSubmit={handleFormSubmit}>
        <select className="select"
                onChange={handlePlayerSelection}
                name="Select your username"
                defaultValue="Select your username to login">
          <option disabled-value="Select your username to login">Select your username</option>
          {existingPlayers}
        </select>
        <button type="submit" className="buttonStyling">Login!</button>
      </form>

      {openRegisterModal && <LoginModal closeModal={setRegisterModal} />}
      <StoryComponent/>
      <LeaderBoardComponent/>
    </div>
  );
};

export default LoginContainer;
