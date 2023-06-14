const PaintingListContainer = ({questionBeingDisplayed, currentGame}) => {
    return ( 
        <div className="caught-fish PLC__container">
        <div className="text__wrapper">
            <h3>Loot:</h3>   
            <h3>Total Score: {currentGame.score}</h3>
        </div>
        
        </div>
     );
}
 
export default PaintingListContainer;