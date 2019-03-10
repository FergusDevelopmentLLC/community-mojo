import { StackNavigator } from "react-navigation";
import { Members } from "./navOrganizer.js";
import AuthApp from "../Auth/App.js";
import Start from "../Auth/start.js";


const InitStk = StackNavigator(
  {
    InitNavigator: { screen: Start },
    AuthNavigator: { screen: AuthApp },
    NavOrganizer: { screen: Members }
  }
);

export { InitStk };
