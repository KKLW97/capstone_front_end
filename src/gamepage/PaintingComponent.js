import paintingSprite from '../assets/PaintingSprite.png';

const PaintingComponent = ({containerHeight, containerWidth, paintingPositionX, paintingPositionY, displayMultipleChoiceQuestion}) => {
    return ( 
        <div className='sprite' 
        style={{
        height: "40px", 
        width: "100px", 
        display: "flex", 
        position: "absolute",
        left: `${paintingPositionX}px`,
        top: `${paintingPositionY}px`,
        }}>
            <img src={paintingSprite} style={{width: "100px", height: "40px"}}/>
        </div> 
     );
}
 
export default PaintingComponent;