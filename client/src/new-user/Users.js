// todo
import React, { useEffect, useReducer } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ResetForm from "./ResetForm";
import LogOut from "./LogOut";
import UserAlert from "./UserAlert";
import { useCookieContext } from "../context/CookieContext";
// ?
const init = {
  login: false,
  signup: false,
  reset: false,
  logout: false,
  //
  alert: false,
  msg: "",
  col: false,
};

// ?
function reducer(state, action) {
  switch (action.type) {
    // ?
    case "clearStates":
      return {
        ...init,
      };

    // ?
    case "showAlert": {
      return {
        ...state,
        alert: true,
        msg: action.msg,
        col: action.col,
      };
    }

    // ?
    case "hideAlert":
      return {
        ...state,
        alert: false,
      };

    // ?
    case "showLogin":
      return {
        ...state,
        login: true,
      };

    // ?
    case "showSignup": {
      return { ...state, signup: true };
    }

    // ?
    case "showReset":
      return {
        ...state,
        reset: true,
      };

    // ?
    case "showLogout":
      return {
        ...state,
        logout: true,
      };

    // ?
    default:
      throw new Error("in user reducer throw");
  }
}

// todo
export default function Users({ tabSet }) {
  // ?
  const [st, dispatch] = useReducer(reducer, init);
  const [cook /* updateCook */] = useCookieContext();

  // ?
  useEffect(() => {
    cook.id
      ? dispatch({ type: "showLogout" })
      : dispatch({ type: "showLogin" });
  }, [cook.id, dispatch]);

  // ?
  return (
    <div className="mt-4">
      <div className="mx-auto w-100">
        {st.alert && <UserAlert state={st} disp={dispatch} />}
        {st.logout && <LogOut tabSet={tabSet} disp={dispatch} />}
        {st.login && <LoginForm disp={dispatch} />}
        {st.signup && <SignupForm disp={dispatch} />}
        {st.reset && <ResetForm disp={dispatch} />}
      </div>
    </div>
  );
}
