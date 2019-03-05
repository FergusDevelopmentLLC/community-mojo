import React, {Component} from 'react';
import firebase from "react-native-firebase";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from "native-base";

export default class Members extends Component {

  static navigationOptions = ({ navigation }) => {
    navigation.state.params.onNavigateBack();
    return {
      header: (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate('MeetupSelect') } />
          <Appbar.Content title={navigation.state.params.group_name}/>
        </Appbar.Header>
      ),
    };
  };

  constructor(props) {

    super(props);

    let group_id = this.props.navigation.getParam('group_id', '0');
    this.membersRef = firebase.firestore().collection('groups').doc(group_id).collection('members');
    
    this.state = {
      tableHead: [
        ['', 'Name', 'Points', '']
      ],
      tableData: [],
      group_id: group_id
    };
  }

  componentWillMount(){
    this.MemberInformation = this.membersRef;
    this.MemberInformation.get().then(data => this.onCollectionUpdate(data));
  }

  onCollectionUpdate = querySnapshot => {

    let members = [];

    querySnapshot.forEach(doc => {

      const {
        src,
        first_name,
        last_name,
        points
      } = doc.data();

      let member = [];
      member.push(src);
      member.push(first_name + ' ' + last_name);
      member.push(points);
      member.push(doc.id + '|' + first_name + ' ' + last_name);

      members.push(member);

    });

    this.setState({
      tableData: members
    });
  };

  goToMemberDetail(data) {
    //Alert.alert(`${data}`);
    let member_id = data.split('|')[0];
    let member_name = data.split('|')[1];
    this.props.navigation.navigate("MemberDetail", { group_id: this.state.group_id , member_id: member_id, name: member_name });
  }
  
  renderCellStyle(idx) {
    switch (idx) {
      case 1:
        return {
          flex: 3
        }
      default:
        return {
          flex: 1
        }
    }
  }

  
  renderCellElement(data, rowIndex, columnIndex) {
    switch (columnIndex) {
      case 0:
        return <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/community-mojo.appspot.com/o/' + data + '?alt=media&token=61d575c7-2811-4056-ad19-ba7d3c616717'}} style={{width: 27, height: 35}}></Image>
      case 3:
        return <TouchableOpacity onPress={() => this.goToMemberDetail(data)}>
                  <View style={{justiftyContent:"center", alignItems:"center"}}>
                    <Icon name="ios-eye" />
                  </View>
                </TouchableOpacity>
      default:
        return <Text>{data}</Text>
    }
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Members</Text>      
        <Table borderStyle={{borderColor: 'transparent'}}>
          {
            state.tableHead.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={[styles.row, {height:30}]}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell 
                      key = { cellIndex } 
                      data = { cellData }
                      style = {[this.renderCellStyle(cellIndex)]}
                      textStyle = { cellIndex === 2 ? {textAlign: 'center'} : "" }
                    />
                  ))
                }
              </TableWrapper>
            ))
          }
          {
            state.tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell 
                      key={ cellIndex } 
                      data={ cellIndex === 2 ? cellData : this.renderCellElement(cellData, rowIndex, cellIndex) }
                      style={[this.renderCellStyle(cellIndex), { borderTopColor: '#ccc', borderTopWidth: 1 }]}
                      textStyle = { cellIndex === 2 || cellIndex === 3 ? {textAlign: 'center'} : "" }
                    />
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
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
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});