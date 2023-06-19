
import "../CSSfiles/Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {

  
  return ( 

    <nav>
      <ul className="navbar_list">
        <li >
          <a href="/">Home</a>
        </li>
        <li >
          <Link to="/playerAccount" > Account </Link>
        </li>
        <li >
          <Link to={"/gamePage"} > Game </Link>
        </li>
      </ul>
    </nav>
  );

}
 
export default Navbar;