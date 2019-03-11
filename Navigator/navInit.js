import { StackNavigator, SwitchNavigator } from "react-navigation";

import loading from "../Auth/Loading";
import start from "../Auth/start";

const Init = StackNavigator(
  {
    Loading: { 
      screen: loading
    }
    ,
    Start: { 
      screen: start
    }
  },
  {
    initialRouteName: "Loading"
  }
);

export { Init };