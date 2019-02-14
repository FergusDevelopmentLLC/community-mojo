import React, { Component } from "react";

import { DrawerNavigator, createStackNavigator } from "react-navigation";
import { DrawerOrganizer } from "./navOrganizer.js";
import { Members } from "./navOrganizer.js";
import { DrawerMember } from "./navMember.js";
import AuthApp from "../Auth/App.js";
// import UserLogin from "../Auth/UserLogin.js";

// Login Stack
const InitStk = createStackNavigator(
  {
    // AuthNavigator: { screen: AuthApp },
    // DrawerNavOrganizer: { screen: DrawerOrganizer },
    // DrawerNavMember: { screen: DrawerMember }
    
    AuthNavigator: { screen: AuthApp },
    NavOrganizer: { screen: Members },
    NavMember: { screen: DrawerMember }
  },
  {
    headerMode: "none"
  }
);

export { InitStk };
