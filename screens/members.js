import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Name', 'Points', ''],
      tableData: [
        ['alien.01.png', 'Thor Cramer', '10', 'X'],
        ['alien.02.png', 'Michelle Oster', '9', 'X'],
        ['alien.03.png', 'Mark Shields', '8', 'X'],
        ['alien.04.png', 'Levi Jeans', '8', 'X'],
        ['alien.05.png', 'Robert Dylan', '6', 'X'],
        ['alien.06.png', 'Eddie Morphy', '5', 'X'],
        ['alien.07.png', 'Mortimer Jones', '0', 'X'],
      ]
    }
  }
 
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  
  getSource(index) {
    if(index === 1)
      return require("./assets/avatars/alien.01.png");
    else if(index === 2)
      return require("./assets/avatars/alien.02.png");
    else if(index === 3)
      return require("./assets/avatars/alien.03.png");
    else if(index === 4)
      return require("./assets/avatars/alien.04.png");
    else if(index === 5)
      return require("./assets/avatars/alien.05.png");
    else if(index === 6)
      return require("./assets/avatars/alien.06.png");
    else if(index === 7)
      return require("./assets/avatars/alien.07.png");
  }
 
  render() {
    const state = this.state;

    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    const image = (data, index) => (
      <Image source={this.getSource(index + 1)} style={{width: 26, height: 34}} />
    );

    return (
      <View style={styles.container}>
        <Text>Members</Text>      
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    // <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    <Cell 
                      key={cellIndex} 
                      data={cellIndex === 3 ? element(cellData, index) : cellIndex === 0 ? image(cellData, index) : cellData} 
                      textStyle={cellIndex != 0 ? styles.text : ""} 
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#fff' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#fff' },
  avatar: { width: 26, height: 34 },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});