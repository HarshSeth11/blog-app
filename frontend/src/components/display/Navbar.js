import "../componentsStyle/Home.css";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.authReducer.auth.isLogin);

  if(isLoggedIn) {
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
            <li>
              <Link to="/createpost">Create Post</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/singup">Sign up</Link>
              </li>
            </>
        </ul>
      </div>
    </div>
    )
  }
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
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/singup">Sign up</Link>
              </li>
            </>
        </ul>
      </div>
    </div>
  );
}
