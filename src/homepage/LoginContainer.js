import LoginModal from "../components/LoginModal";
import "../CSSfiles/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginContainer = ( {postNewPlayer ,  allPlayers, activePlayer, setActivePlayer}) => {
  const [openRegisterModal, setRegisterModal] = useState(false);


  const existingPlayers = allPlayers.map((player) => {
      return (
        <option key={player.id} value={player.id}>
          {player.name} (id {player.id})
        </option>
      );
    });


    const handlePlayerSelection = (event) => {
        const selectedPlayer = event.target.value;
        setActivePlayer(selectedPlayer);
      };

    const navigate = useNavigate();
    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate("/playersAccount");
      };




  return (
    <div className="background">
      <h3> This is the login container </h3>
      <h3> New Player? </h3>
      <button className="openModalBtn" onClick={() => {setRegisterModal(true);}}>
        Register
      </button>
        
        <form onSubmit={handleFormSubmit}>
          <select
            onChange={handlePlayerSelection}
            name="Select your username"
            defaultValue="Select your username to login">
            <option disabled-value="Select your username to login">
                Select your username
            </option>
      
            {existingPlayers}
          </select>
          <button type="submit">Login!</button>
        </form>
  

      {/* if open modeal is true then render the LoginModal component */}
    {openRegisterModal && <LoginModal closeModal={setRegisterModal} postNewPlayer ={postNewPlayer}  allPlayers = {allPlayers}/>} 
    </div>
  );
};

export default LoginContainer;
