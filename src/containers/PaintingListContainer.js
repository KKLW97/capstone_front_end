import "../CSSfiles/PaintingListContainer.css"
const PaintingListContainer = ({stolenArtworkList, currentGame}) => {
    return ( 
       <div>
         <div> 
            <h3 className="title-heading"> These are the cool paintings you stole</h3> 
            <h3 className="title-heading">Total Score: {currentGame.score}</h3>
         </div>

         <div className="caught-fish">
                          {stolenArtworkList.map(stolenArtwork => <div><div classname="caught-fish-image"><img src={stolenArtwork.artwork.url} height="100px"/></div> <p>"{stolenArtwork.artwork.title}", {stolenArtwork.artwork.artist}
              </p></div>)}
          </div>
       </div>
     );
}

export default PaintingListContainer;

//