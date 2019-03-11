import { StackNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";
import { Init } from "./navInit.js";
import AuthApp from "../Auth/App.js";
import { Members } from "./navOrganizer.js";
import { MemberPath } from "./navMember.js";

// Login Stack
const InitStk = StackNavigator(
  {
    // AuthNavigator: { screen: AuthApp },
    // DrawerNavOrganizer: { screen: DrawerOrganizer },
    // DrawerNavMember: { screen: DrawerMember }
    
    InitNavigator: { screen: Init },
    AuthNavigator: { screen: AuthApp },
    NavOrganizer: { screen: Members },
    NavMember: { screen: MemberPath }
  },
  {
    headerMode: "none"
  }
);



// const InitStk = StackNavigator(
//   {
//     InitNavigator: { screen: Init },
//     AuthNavigator: { screen: AuthApp },
//     NavOrganizer: { screen: Members }
//   }
// );

export { InitStk };