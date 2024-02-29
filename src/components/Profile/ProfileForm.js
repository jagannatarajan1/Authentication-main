import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../Context/AuthContext";

const ProfileForm = () => {
  const context = useContext(AuthContext);
  const newpassword = useRef();
  const formHandler = async (event) => {
    event.preventDefault();
    const enterednewpassword = newpassword.current.value;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBTTL9UvxbeKWeVS8f8O1kWV9ozL8Hgo_M",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: context.token,
          password: enterednewpassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    if (response.ok) {
      console.log(data);
    } else {
      throw new Error(data.error.message);
    }
  };
  return (
    <form className={classes.form} onSubmit={formHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password" ref={newpassword}>
          New Password
        </label>
        <input type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
