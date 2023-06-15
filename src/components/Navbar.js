
import "../CSSfiles/Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {

  
  return ( 

    <nav>
      <ul className="navbar_list">
        <li >
            <Link to="/" className="nav-text"> Home</Link>
        </li>
        <li >
        <Link to="/playerAccount" className="nav-text" > Account </Link>
        </li>
        <li >
        <Link to={"/gamePage"} className="nav-text" > Game </Link>
        </li>
      </ul>
    </nav>
  );

}
 
export default Navbar;