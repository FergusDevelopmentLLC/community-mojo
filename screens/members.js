import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from "native-base";

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        ['', 'Name', 'Points', '']
      ],
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
        return <Image source={this.getSource(rowIndex + 1)} style={{width: 26, height: 34}}></Image>
      case 3:
        return <TouchableOpacity onPress={() => this._alertIndex(rowIndex)}>
                  <View>
                    <Icon name="ios-eye" />
                  </View>
                </TouchableOpacity>
      default:
        return <Text>{data}</Text>
    }
  }

  renderHead(rowData, rowIndex) {
    console.log(rowData)
    console.log(rowIndex)
  }
  
  // {
  //   state.tableHead.map((rowData, rowIndex) => (
  //     <Row data={ this.renderHead(rowData, rowIndex) } style={styles.head} textStyle={ styles.text }/>
  //   ))
  // }

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
  }
});