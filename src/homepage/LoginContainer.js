import LoginModal from "../components/LoginModal";
import "../CSSfiles/Login.css";
import { useState, useEffect } from "react";

const LoginContainer = ( {postNewPlayer ,  allPlayers}) => {
  const [openRegisterModal, setRegisterModal] = useState(false);




  return (
    <div className="background">
      <h3> This is the login container </h3>
      <h3> New Player? </h3>
      <button className="openModalBtn" onClick={() => {setRegisterModal(true);}}>
        Register
      </button>

      {/* if open modeal is true then render the LoginModal component */}
    {openRegisterModal && <LoginModal closeModal={setRegisterModal} postNewPlayer ={postNewPlayer}  allPlayers = {allPlayers}/>} 
    </div>
  );
};

export default LoginContainer;
