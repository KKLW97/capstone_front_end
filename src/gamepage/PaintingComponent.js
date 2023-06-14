import paintingSprite from '../assets/PaintingSprite.png';

const PaintingComponent = ({paintingClass, paintingPositionX, paintingPositionY}) => {
    return ( 
        <img className={paintingClass} src={paintingSprite}
            style={{
                height: "40px", 
                width: "100px", 
                display: "flex", 
                position: "absolute",
                left: `${paintingPositionX}px`,
                top: `${paintingPositionY}px`,
                }}/>
     );
}
 
export default PaintingComponent;