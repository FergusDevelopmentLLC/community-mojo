import React, { Component } from "react";

import { DrawerNavigator, StackNavigator } from "react-navigation";

//IMPORT EVERYTHING!!
import createform from "../screens/createform";
import listofcreatedqueues from "../screens/listofcreatedqueues";
import queuers from "../screens/queuers";
import currentqueuer from "../screens/currentqueuer";
import listofactivequeues from "../screens/listofactivequeues";
import joinaqueue from "../screens/joinaqueue";
import listofyourqueues from "../screens/listofyourqueues";
import seestatus from "../screens/seestatus";
import rescindname from "../screens/rescindname";

import meetup_select from "../screens/meetup_select";
import member from "../screens/member";
import members from "../screens/members";

const Members = StackNavigator(
  {
    MeetupSelect: { screen: meetup_select },
    MemberList: { screen: members },
    MemberDetail: { screen: member },
  },
  {
    initialRouteName: "MeetupSelect"
  }
);

// const Members = StackNavigator(
//   {
//     ViewMembers: { screen: members }
//   },
//   {
//     initialRouteName: "ViewMembers",
//     navigationOptions: {
//       title: "Members",
//       headerStyle: {
//         backgroundColor: "blue"
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         fontWeight: "bold"
//       }
//     }
//   }
// );


//stack1
const CreateAQueuePage = StackNavigator(
  {
    CreateForm: { screen: createform }
  },
  {
    initialRouteName: "CreateForm",
    navigationOptions: {
      title: "Create A Queue",

      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
//stack2
const YourCreatedQueuesPage = StackNavigator(
  {
    ListOfCreatedQueues: { screen: listofcreatedqueues },
    Queuers: { screen: queuers },
    CurrentQueuer: { screen: currentqueuer }
  },
  {
    initialRouteName: "ListOfCreatedQueues"
  }
);
//stack3
const ActiveQueuesPage = StackNavigator(
  {
    ListOfActiveQueues: { screen: listofactivequeues },
    JoinAQueue: { screen: joinaqueue }
  },
  {
    initialRouteName: "ListOfActiveQueues"
  }
);
//stack4
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
// const DrawerOrganizer = DrawerNavigator({
//   "Create A Queue": { screen: CreateAQueuePage },
//   "Your Created Queues": { screen: YourCreatedQueuesPage },
//   "Active Queues": { screen: ActiveQueuesPage }
// });

const DrawerOrganizer = DrawerNavigator({
  "Meetup Select": { screen: meetup_select }
});

export { Members };
