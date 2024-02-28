import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../Context/AuthContext";

const AuthForm = () => {
  const context = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setloading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let url;
    setloading(true);
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTTL9UvxbeKWeVS8f8O1kWV9ozL8Hgo_M";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTTL9UvxbeKWeVS8f8O1kWV9ozL8Hgo_M";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      } else {
        console.log(data);
        context.login(data.idToken);
        localStorage.setItem("IdToken", JSON.stringify(data.idToken));
        console.log(context);
      }

      // Signup successful, handle further actions like redirecting
    } catch (error) {
      alert(error);
    }
    setloading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>

        <div className={classes.actions}>
          {!loading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {loading && <p className={classes.color}>Loading......</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
