import { useState } from "react";
import "../CSSfiles/StoryComponent.css"

const StoryComponent = () => {

  const [show, setShow] = useState(false);
  const handleClick = () => {setShow((prev) => !prev)}

  return (
    <div >
      <p className="story">
        <b>Time:</b> Tonight
        <br/>
        <b>Location:</b> BNTA Gallery
        <br/>
        <b>Event: </b>
        {show==false ?
          <>
            The biggest art heist in history...  
            <button className="story-button" onClick={handleClick}>Learn More</button>
          </>
          :
          <>
            The biggest art heist in history! 
            <br/>
            You are Stephane, a famous art thief. 
            <br/>
            Tonight you and your cat will break into the heavily guarded BNTA Gallery.
            <br/>
            Login if you dare... 
            <button className="story-button" onClick={handleClick}>Back</button>
          </>
        }
      </p>
    </div>
  );
};

export default StoryComponent;
