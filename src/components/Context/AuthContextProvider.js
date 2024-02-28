import React, { useState } from "react";
import AuthContext from "./AuthContext";
const AuthContextProvider = (props) => {
  const [token, settoken] = useState(null);
  const userLoggedIn = !!token;
  const loginHandler = (token) => {
    settoken(token);
  };
  const logoutHandler = () => {
    settoken(null);
  };
  const context = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
