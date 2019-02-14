import React, {Component} from 'react';
import firebase from "react-native-firebase";
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

// export default class Member extends React.Component {
//   render() {
    
//     const itemId = this.props.navigation.getParam('id', '0');

//     return (
//       <View style = {styles.container}>
// 	      <Text style = {styles.countText}>Member Detail {JSON.stringify(itemId)}</Text>
//       </View>
//     );
//   }
// }


export default class Member extends Component {
  constructor(props) {

    super(props);

    this.setState({
      id: 0,
      member: null
    });

    this.membersRef = firebase.firestore().collection("Member");
  }

  componentWillMount(){
    const itemId = this.props.navigation.getParam('id', '0');
    this.setState({
      id: itemId,
      member: null
    });
    this.MemberInformation = this.membersRef;
    this.MemberInformation.get().then(data => this.onCollectionUpdate(data));
  }

  onCollectionUpdate = querySnapshot => {

    //const member

    querySnapshot.forEach(doc => {

      const {
        src,
        first_name,
        last_name,
        points,
        idc
      } = doc.data();

      console.log(doc);

    });

    this.setState({
      member: null
    });
  };

  render() {
    const state = this.state;
    return (
      <View style = {styles.container}>
	      <Text style = {styles.countText}>Member Detail {JSON.stringify(this.state.itemId)}</Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: { 
    height: 30,
  },
  text: {
    margin: 6
  },
  row: {
    flexDirection: 'row',
    height: 50
  },
  btnBox: {
    flexDirection: 'row'
  },
  avatar: { 
    width: 26,
    height: 34
  },
  btn: { 
    width: 58, 
    height: 18, 
    backgroundColor: '#78B7BB',  
    borderRadius: 2 },
  btnText: { 
    textAlign: 'center',
    color: '#fff',
    lineHeight: 26
  },
  imgCell: { 
    lineHeight: 26
  }
});