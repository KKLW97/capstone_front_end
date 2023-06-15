import React, { useEffect, useState } from "react";
import "../CSSfiles/PenaltyList.css";
import alarm from "../assets/alarm.png"


const PenaltyList = ({ currentGame }) => {
  const [currentPenalty, setCurrentPenalty] = useState(0);

  useEffect(() => {
    setCurrentPenalty(currentGame.penalty);
  }, [currentGame]);

  // Determine the number of PenaltyComponent instances to display
  const numPenalties = 3;

  // Generate an array of indices for rendering PenaltyComponent instances
  const penaltyIndices = Array.from({ length: numPenalties }, (_, index) => index);

  return (
    <div className="penalty-list-container">
      <section className="penalty-list">
        {penaltyIndices.map((index) => (
              <img id={index < currentPenalty ? "alarm-on" : "alarm"}
               src={alarm}  width={100} height={100} alt="an image of security alarm"/>
        ))}
      </section>
    </div>
  );
};

export default PenaltyList;
