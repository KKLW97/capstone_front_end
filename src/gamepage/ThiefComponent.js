// import blob2 from '../assets/blob2.png';
import thief_sprite_right from '../assets/thief_sprite_right.png';
import thief_sprite_left from '../assets/thief_sprite_left.png';
import thief_sprite_front from '../assets/thief_sprite_front.png';
import thief_sprite_back from '../assets/thief_sprite_back.png';

const ThiefComponent = ({containerHeight, containerWidth, thiefPositionX, thiefPositionY, thiefImage}) => {
    return (
      <div
        className="sprite boat-sprite"
        style={{
            height: "70px",
            width: "70px",
            display: "flex",
            position: "absolute",
            left: `${thiefPositionX}px`,
            top: `${thiefPositionY}px`,
            }}
        >
            {/* <img src={blob2}/> */}
            {thiefImage === "heading right" ? <img src={thief_sprite_right} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : thiefImage === "heading left" ? <img src={thief_sprite_left} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
                : thiefImage === "heading up" ? <img src={thief_sprite_back} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/> 
            : <img src={thief_sprite_front} style={{"-webkit-filter":"drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(5px 5px 5px #222)"}}/>}
      
        </div>
      );
}
 
export default ThiefComponent;






