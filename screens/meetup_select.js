import React, {Component} from 'react';
import firebase from "react-native-firebase";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Button } from "react-native-paper";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from "native-base";

class List extends Component {
  state = {
     names: [
        {
           id: 0,
           name: 'Ben',
        },
        {
           id: 1,
           name: 'Susan',
        },
        {
           id: 2,
           name: 'Robert',
        },
        {
           id: 3,
           name: 'Mary',
        }
     ]
  }
  alertItemName = (item) => {
     alert(item.name)
  }
  render() {
     return (
        <View>
           {
              this.state.names.map((item, index) => (
                <Button>{item.name}</Button>
              ))
           }
        </View>
     )
  }
}
export default List

const styles = StyleSheet.create ({
  container: {
     padding: 10,
     marginTop: 3,
     backgroundColor: '#d9f9b1',
     alignItems: 'center',
  },
  text: {
     color: '#4f603c'
  }
})



// export default class MemberSelect extends Component {
//   constructor(props) {

//     super(props);

//     this.membersRef = firebase.firestore().collection("Group");
    
//     this.state = {
//       tableHead: [
//         ['', 'Name', 'Points', '']
//       ],
//       tableData: []
//     };
//   }

//   componentWillMount(){
//     this.MemberInformation = this.membersRef;
//     this.MemberInformation.get().then(data => this.onCollectionUpdate(data));
//   }

//   onCollectionUpdate = querySnapshot => {

//     const members = [];

//     querySnapshot.forEach(doc => {

//       const {
//         src,
//         first_name,
//         last_name,
//         points,
//         idc
//       } = doc.data();

//       let member = [];
//       member.push(src);
//       member.push(first_name + ' ' + last_name);
//       member.push(points);
//       member.push(doc.id);

//       members.push(member);

//     });

//     this.setState({
//       tableData: members
//     });
//   };

//   alertId(id) {
//     //Alert.alert(`${id}`);
//     this.props.navigation.navigate("MemberDetail", { id });
//   }

//   renderCellStyle(idx) {
//     switch (idx) {
//       case 1:
//         return {
//           flex: 3
//         }
//       default:
//         return {
//           flex: 1
//         }
//     }
//   }

//   renderCellElement(data, rowIndex, columnIndex) {
//     switch (columnIndex) {
//       case 0:
//         return <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/community-mojo.appspot.com/o/' + data + '?alt=media&token=61d575c7-2811-4056-ad19-ba7d3c616717'}} style={{width: 27, height: 35}}></Image>
//       case 3:
//         return <TouchableOpacity onPress={() => this.alertId(data)}>
//                   <View style={{justiftyContent:"center", alignItems:"center"}}>
//                     <Icon name="ios-eye" />
//                   </View>
//                 </TouchableOpacity>
//       default:
//         return <Text>{data}</Text>
//     }
//   }

//   render() {
//     const state = this.state;
    
//     return (
//       <View style={styles.container}>
//         <Text style={{fontWeight: 'bold', marginBottom: 10}}>Meetup Select</Text>      
//         <Table borderStyle={{borderColor: 'transparent'}}>
//           {
//             state.tableHead.map((rowData, rowIndex) => (
//               <TableWrapper key={rowIndex} style={[styles.row, {height:30}]}>
//                 {
//                   rowData.map((cellData, cellIndex) => (
//                     <Cell 
//                       key = { cellIndex } 
//                       data = { cellData }
//                       style = {[this.renderCellStyle(cellIndex)]}
//                       textStyle = { cellIndex === 2 ? {textAlign: 'center'} : "" }
//                     />
//                   ))
//                 }
//               </TableWrapper>
//             ))
//           }
//           {
//             state.tableData.map((rowData, rowIndex) => (
//               <TableWrapper key={rowIndex} style={styles.row}>
//                 {
//                   rowData.map((cellData, cellIndex) => (
//                     <Cell 
//                       key={ cellIndex } 
//                       data={ cellIndex === 2 ? cellData : this.renderCellElement(cellData, rowIndex, cellIndex) }
//                       style={[this.renderCellStyle(cellIndex), { borderTopColor: '#ccc', borderTopWidth: 1 }]}
//                       textStyle = { cellIndex === 2 || cellIndex === 3 ? {textAlign: 'center'} : "" }
//                     />
//                   ))
//                 }
//               </TableWrapper>
//             ))
//           }
//         </Table>
//       </View>
//     )
//   }
// }
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     paddingTop: 30,
//     backgroundColor: '#fff'
//   },
//   head: { 
//     height: 30,
//   },
//   text: {
//     margin: 6
//   },
//   row: {
//     flexDirection: 'row',
//     height: 50
//   },
//   btnBox: {
//     flexDirection: 'row'
//   },
//   avatar: { 
//     width: 26,
//     height: 34
//   },
//   btn: { 
//     width: 58, 
//     height: 18, 
//     backgroundColor: '#78B7BB',  
//     borderRadius: 2 },
//   btnText: { 
//     textAlign: 'center',
//     color: '#fff',
//     lineHeight: 26
//   },
//   imgCell: { 
//     lineHeight: 26
//   }
// });