import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";

import AuthContext from "../Context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = (props) => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const login = context.isLoggedIn;
  const logoutHandler = () => {
    context.logout();
    localStorage.clear();
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!login && <Link to="/auth">Login</Link>}</li>
          <li>{login && <Link to="/profile">Profile</Link>}</li>
          <li>
            {login && <Link to="/auth">Login</Link> && (
              <button onClick={logoutHandler}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
