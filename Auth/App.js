import React from "react";
import { SwitchNavigator } from "react-navigation";

// import the different screens
import Loading from "./Loading";
import Start from "./start";
import SignUp from "./SignUp";
import SignupLogin from "./SignupLogin";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Main from "./Main";

const AuthApp = SwitchNavigator(
  {
    Loading,
    Start,
    SignupLogin,
    SignUp,
    Login,
    ForgotPassword,
    Main
  },
  {
    initialRouteName: "Loading"
  }
);

export default AuthApp;