
import "../CSSfiles/Navbar.css";

const Navbar = () => {

  
    return ( 
    
    <>
    <nav className="">
      <ul className="navbar_list">
        <li className="">
          <a href="http://localhost:3000" className="#">Home</a>
        </li>
        <li className="">
          <a href="http://localhost:3000/playerAccount" className="#">Account</a>
        </li>
        <li className="">
          <a href="http://localhost:3000/gamePage" className="#">Game</a>
        </li>
      </ul>
    </nav>
    
    
    
    
    </> );
}
 
export default Navbar;