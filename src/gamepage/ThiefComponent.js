import blob2 from '../assets/blob2.png';

const ThiefComponent = ({containerHeight, containerWidth, thiefPositionX, thiefPositionY, thiefImage}) => {
    return (
      <div
        className="sprite boat-sprite"
        style={{
            height: "60px",
            width: "60px",
            display: "flex",
            position: "absolute",
            left: `${thiefPositionX}px`,
            top: `${thiefPositionY}px`,
            }}
        >
            <img src={blob2}/>
        </div>
      );
}
 
export default ThiefComponent;