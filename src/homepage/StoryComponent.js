import { useState } from "react";

const StoryComponent = () => {

    const [show, setShow] = useState(false);

    const handleClick = () => {setShow((prev) => !prev)}
 
        return (
            

                <div>
                   

                {show==false ? 
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
                            <button onDoubleClick={handleClick}>Back</button>
                    </div>}
                
                </div>
                

        );
      };



export default StoryComponent;

