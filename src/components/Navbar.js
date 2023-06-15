
import "../CSSfiles/Navbar.css";

const Navbar = () => {

  
  return ( 
    <>
      <nav className="nav-bar">
        <ul className="navbar_list">
          <li className="">
            <div className="nav-text">
            <a href="http://localhost:3000" className="#">Home</a></div>
          </li>
          <li className="">
            <div className="nav-text">
            <a href="http://localhost:3000/playerAccount" className="#">Account</a></div>
          </li>
          <li className="">
            <div className="nav-text">
            <a href="http://localhost:3000/gamePage" className="#">Game</a></div>
          </li>
        </ul>
      </nav>

    </> 
  );
}
 
export default Navbar;