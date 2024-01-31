import "../componentsStyle/Home.css";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.authReducer.auth.isLogin);

  const navList = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "About",
      slug: "/",
      active: true
    },
    {
      name: "Create Post",
      slug: "/createpost",
      active: isLoggedIn
    },
    {
      name: "Logout",
      slug: "/logout",
      active: isLoggedIn
    },
    {
      name: "Login",
      slug: "/login",
      active: !isLoggedIn
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !isLoggedIn
    },
  ]


  return (
    <div>
      <nav className="navbar">
         <div className="header">Blog</div>
      </nav>
      <div className="navbar-links">
        <ul className="links">
          {
            navList.map((item) => (
              item.active ? (
                <li key={item.name}><Link to={item.slug}>{item.name}</Link></li>
              ) : null)
            )
          }
        </ul>
      </div>
    </div>
  )
}
