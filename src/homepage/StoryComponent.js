import { useState } from "react";

const StoryComponent = () => {

    const [stateNextButton, setStateNextButton] = useState(false);

    const handleClick = () => {
        setStateNextButton(true);
      }
 
        return (
            

                <div>
                   

                {stateNextButton==false ? 
                        <div>
                            <p>
                            <b>Time:</b> Tonight
                            <br/>
                            <b>Location:</b> BNTA Gallery
                            <br/>
                            <b>Event:</b>The biggest art heist in history...  
                            <button onDoubleClick={handleClick}>Learn More</button>
                            </p>
                        </div>
                    :
                    <div>
                            You are Stephane, a famous art thief. Tonight you and your cat will break into the heavily guarded BNTA Gallery. Login if you dare... 
                    </div>}
                
                </div>
                

        );
      };



export default StoryComponent;

