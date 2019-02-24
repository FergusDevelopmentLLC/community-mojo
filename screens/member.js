import React, {Component} from 'react';
import firebase from "react-native-firebase";
import {Platform, StyleSheet, Text, View, Button, FlatList, Dimensions} from 'react-native';
import { Appbar } from 'react-native-paper';

export default class Member extends Component {

  static navigationOptions = ({ navigation }) => {
    
    return {
      header: (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={navigation.state.params.name}/>
        </Appbar.Header>
      ),
    };
  };

  constructor(props) {

    super(props);

    this.setState({
      id: 0,
      member: null,
      skills: [
        { key: 'A' }, 
        { key: 'B' }, 
        { key: 'C' }, 
        { key: 'D' }, 
        { key: 'E' }, 
        { key: 'F' }
      ]
    });

    let group_id = this.props.navigation.getParam('group_id', '0');
    let member_id = this.props.navigation.getParam('member_id', '0');
    this.memberRef = firebase.firestore().collection('User').doc(firebase.auth().currentUser.uid).collection('Groups').doc(group_id).collection('Members').doc(member_id);

  }

  componentWillMount(){
    this.setState({
      member: null
    });
    this.MemberInformation = this.memberRef;
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
	      <Text style = {styles.countText}>xMember Detail {JSON.stringify(this.state.itemId)}</Text>
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