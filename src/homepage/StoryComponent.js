import { useState } from "react";
import "../CSSfiles/StoryComponent.css"

const StoryComponent = () => {


const [show, setShow] = useState(false);

const handleClick = () => {setShow((prev) => !prev)}

 
  return (
    <div >

    {show==false ? 
            <div >
                <p className="story">
                  <b>Time:</b> Tonight
                  <br/>
                  <b>Location:</b> BNTA Gallery
                  <br/>
                  <b>Event:</b>The biggest art heist in history...  
                  <button className="story-button" onClick={handleClick}>Learn More</button>
                </p>
            </div>
        :
        <div >
          <p className="story">
                  <b>Time:</b> Tonight
                  <br/>
                  <b>Location:</b> BNTA Gallery
                  <br/>
                  <b>Event:</b>The biggest art heist in history! 
                  <br/>
                  You are Stephane, a famous art thief. 
                  <br/>
                  Tonight you and your cat will break into the heavily guarded BNTA Gallery.
                  <br/>
                  Login if you dare... 
                <button className="story-button" onClick={handleClick}>Back</button></p>
        </div>}
    
    </div>
  );
};


export default StoryComponent;

