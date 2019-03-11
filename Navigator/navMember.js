import { StackNavigator } from "react-navigation";

import m_group_select from "../screens/m_group_select";
import m_group_code from "../screens/m_group_code";
import m_member_create from "../screens/m_member_create";
import m_pick_member from "../screens/m_pick_member";
import m_member from "../screens/m_member";
import m_members from "../screens/m_members";

const MemberPath = StackNavigator(
  {
    memberGroupSelect: { 
      screen: m_group_select
    },
    memberEnterCode: { 
      screen: m_group_code
    },
    memberCreate: { 
      screen: m_member_create
    },
    memberPick: { 
      screen: m_pick_member
    },
    memberViewDetail: { 
      screen: m_member
    },
    membersViewGroup: { 
      screen: m_members
    },
  },
  {
    initialRouteName: "memberGroupSelect"
  }
);


export { MemberPath };