const PaintingListContainer = ({stolenArtworkList, questionBeingDisplayed, currentGame}) => {
    return ( 
        <div className="caught-fish">
            <h3> This is the PaintingListContainer</h3>
            <h3>Total Score: {currentGame.score}</h3>
            {stolenArtworkList.map(stolenArtwork => <div><img src={stolenArtwork.artwork.url} height="100px"/><p>"{stolenArtwork.artwork.title}", {stolenArtwork.artwork.artist}</p></div>)}
        </div>
     );
}
 
export default PaintingListContainer;