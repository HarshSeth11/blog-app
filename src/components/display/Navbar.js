import "../componentsStyle/Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar">
        <div className="header">Blog</div>
      </nav>
      <div className="navbar-links">
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          {authContext.isLoggedIn ? (
            <li>
              <Link to="/createpost">Create Post</Link>
            </li>
          ) : (
            ""
          )}
          {authContext.isLoggedIn ? (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/singup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
