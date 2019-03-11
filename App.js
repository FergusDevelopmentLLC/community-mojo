import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { InitStk } from "./Navigator/InitialStack";

export default class CustomDrawer extends Component {
  render() {
    return <InitStk />;
  }
}
AppRegistry.registerComponent("PostureApp", () => CustomDrawer);
AppRegistry.registerComponent("RNFirebaseStarter", () => AuthApp);