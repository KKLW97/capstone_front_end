const PaintingListContainer = ({stolenArtworkList, questionBeingDisplayed}) => {
    return ( 
        <div className="caught-fish">
            <h3> This is the PaintingListContainer</h3>
            {/* <img src={thisPainting}/> */}
            {stolenArtworkList.map(stolenArtwork => <div><img src={stolenArtwork.artwork.url} height="100px"/><p>"{stolenArtwork.artwork.title}", {stolenArtwork.artwork.artist}
            </p></div>)}
        </div>
     );
}
// console.log(stolenArtwork[1].artwork.id);
export default PaintingListContainer;

//