import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const MainNavigation = (props) => {
  const context = useContext(AuthContext);
  const login = context.isLoggedIn;
  const logoutHandler = () => {
    context.logout();
    localStorage.clear();
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
          <li>{login && <button onClick={logoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
