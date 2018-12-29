import React, { Component } from "react";

import { DrawerNavigator, StackNavigator } from "react-navigation";

//IMPORT EVERYTHING!!
import queuers from "../screens/queuers";
import currentqueuer from "../screens/currentqueuer";
import listofactivequeues from "../screens/listofactivequeues";
import joinaqueue from "../screens/joinaqueue";
import listofyourqueues from "../screens/listofyourqueues";
import seestatus from "../screens/seestatus";
import rescindname from "../screens/rescindname";

//stack1
const ActiveQueuesPage = StackNavigator(
  {
    ListOfActiveQueues: { screen: listofactivequeues },
    JoinAQueue: { screen: joinaqueue }
  },
  {
    initialRouteName: "ListOfActiveQueues"
  }
);
//stack2
const QueuesYouAreInPage = StackNavigator(
  {
    ListOfYourQueues: { screen: listofyourqueues },
    SeeStatus: { screen: seestatus },
    RescindName: { screen: rescindname }
  },
  {
    initialRouteName: "ListOfYourQueues"
  }
);

//drawer combining all the stacks
const DrawerMember = DrawerNavigator({
  "Active Queues": { screen: ActiveQueuesPage },
  "Queues You Are In": { screen: QueuesYouAreInPage }
});

export { DrawerMember };
