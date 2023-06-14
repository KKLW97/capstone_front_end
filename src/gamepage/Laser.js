import laser from '../assets/redLaser.png';

const Laser = ({laserVisibility, laserPositionY, laserPositionX}) => {

    return ( 
        <img src={laser} width="320px" height="2px"
            style={{
                boxShadow: "0px 0px 10px 3px #F7170D",
                display: "flex",
                position: "absolute",
                left: `${laserPositionX}px`,
                top: `${laserPositionY}px`,
                visibility: `${laserVisibility}`,
                }}/>
     );
}
 
export default Laser;