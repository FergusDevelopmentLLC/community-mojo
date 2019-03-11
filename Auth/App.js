  
import { SwitchNavigator } from "react-navigation";

// import the different screens
import SignUp from "./SignUp";
import SignupLogin from "./SignupLogin";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Main from "./Main";

const AuthApp = SwitchNavigator(
  {
    SignupLogin,
    SignUp,
    Login,
    ForgotPassword,
    Main
  },
  {
    initialRouteName: "SignupLogin"
  }
);

export default AuthApp;