import { StackNavigator } from "react-navigation";

import member from "../screens/member";
import members from "../screens/members";
import group_select from "../screens/group_select";
import group_create from "../screens/group_create";
import skill_create from "../screens/skill_create";

import m_group_select from "../screens/m_group_select";

const Members = StackNavigator(
  {
    MeetupSelect: { 
      screen: group_select
    },
    GroupCreate: { 
      screen: group_create
    },
    MemberList: { 
      screen: members
     },
    MemberDetail: { 
      screen: member 
    },
    SkillCreate: { 
      screen: skill_create 
    }
  },
  {
    initialRouteName: "MeetupSelect"
  }
);

export { Members };