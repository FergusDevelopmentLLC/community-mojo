import React, {Component} from 'react';
import firebase from "react-native-firebase";
import {Platform, StyleSheet, Text, View, Button, FlatList, Dimensions, Image} from 'react-native';
import { Appbar } from 'react-native-paper';
import console = require('console');

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

    this.state = {
      id: 0,
      numColumns: 4,
      member: null,
      skillwidth: null,
      skills: [
        { 
          name: 'Attended Meetup',
          points: 1
          
        }, 
        { 
          name: 'Public Speaking',
          points: 1,
          
        }, 
        { 
          name: 'Brought Food',
          points: 1,
        }, 
        { 
          name: 'Travel',
          points: 2,
        }, 
        { 
          name: 'Organized Event',
          points: 10,
        }
      ]
    };

    let group_id = this.props.navigation.getParam('group_id', '0');
    let member_id = this.props.navigation.getParam('member_id', '0');
    this.memberRef = firebase.firestore().collection('groups').doc(group_id).collection('members').doc(member_id);
    this.skillsRef = firebase.firestore().collection('groups').doc(group_id).collection('members').doc(member_id).collection('skills');
    
  }

  componentDidMount(){
    this.MemberInformation = this.memberRef;
    this.MemberInformation.get().then(data => this.onCollectionUpdate(data));
    this.skillsRef.get().then(data => this.onSkillsCollectionUpdate(data));
  }

  onSkillsCollectionUpdate = querySnapshot => {

    console.log('here');

    let skills = [];

    querySnapshot.forEach(doc => {

      const {
        name,
        points
      } = doc.data();

      let skill = {};
      skill.name = doc.name;
      skill.points = doc.points;
      skills.push(skill);
    });

    console.log(skills);

  };

  onCollectionUpdate = querySnapshot => {
    
    this.setState({
      member: querySnapshot._data,
    });

    
    // querySnapshot.forEach(doc => {

    //   const {
    //     src,
    //     first_name,
    //     last_name,
    //     points,
    //     idc
    //   } = doc.data();

    //   console.log(doc);

    // });

  };

  formatData = (data, numColumns) => {
  
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };

  renderItem = ({ item, index, numColumns }) => {

    //console.log(item);

    const sideWidth = (Dimensions.get('window').width - 160) / 4

    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/community-mojo.appspot.com/o/blockrado128.png?alt=media&token=61d575c7-2811-4056-ad19-ba7d3c616717' }} style={{ width: sideWidth, height: sideWidth }}></Image>
        <Text key={index} style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };


  render() {
    if (this.state.member) {
      return (
        <View style={styles.container}>
          <View style={styles.justifycontainer}>
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/community-mojo.appspot.com/o/' + this.state.member['src'] + '?alt=media&token=61d575c7-2811-4056-ad19-ba7d3c616717' }} style={{ width: 81, height: 105 }}></Image>
          </View>
          <View style={styles.namecontainer}>
            <Text style={{fontWeight: 'bold', fontSize: 25, color: '#000'}}>
              {this.state.member['first_name'] + ' ' + this.state.member['last_name']}
            </Text>
          </View>
          <FlatList
            data={this.formatData(this.state.skills, this.state.numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={this.state.numColumns}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )
    } else {
      return <View></View>
    }
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  justifycontainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  namecontainer: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  image: {
    width: 50,
    height: 50
  },
  flcontainer: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: (Dimensions.get('window').width - 50) / 4, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#000000',
    fontSize: 9.5,
    marginTop: 2
  }
});

