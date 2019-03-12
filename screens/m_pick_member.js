import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Icon } from "native-base";
import { getAvatarImageUrl } from "../helper/helpers";

export default class memberPick extends Component {

    static navigationOptions = ({ navigation }) => {
        //navigation.state.params.onNavigateBack();
        return {
            header: (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={navigation.state.params.group_name} />
                </Appbar.Header>
            ),
        };
    };

    constructor(props) {

        super(props);

        let group_id = this.props.navigation.getParam('group_id', '0');
        let group_name = this.props.navigation.getParam('group_name', '0');
        this.groupRef = firebase.firestore().collection('groups').doc(group_id);
        this.membersRef = firebase.firestore().collection('groups').doc(group_id).collection('members').orderBy('points', 'desc');

        this.state = {
            tableHead: [
                ['', 'Name']
            ],
            tableData: [],
            group_id: group_id,
            group_name: group_name,
            group: null,
            loading: true
        };
    }

    componentDidMount() {
        this.queryMembers();
        this.groupRef.get().then(doc => {
            this.setState({
                group: doc._data
            });
        });
    }

    queryMembers() {

        this.membersRef.get().then(data => this.onCollectionUpdate(data));
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
            member.push(doc.id + '|' + src + '|' + first_name + ' ' + last_name);
            member.push(doc.id + '|' + src + '|' + first_name + ' ' + last_name);
            members.push(member);
        });

        this.setState({
            tableData: members,
            loading: false
        });
    };

    async goToMemberDetail(data) {
        let member_id = data.split('|')[0];
        let member_name = data.split('|')[2];

        console.log(data);
        console.log(member_id);
        console.log(member_name);
        
        //save unique device id of member
        this.props.navigation.navigate("memberViewDetail", { group_id: this.state.group_id, member_id: member_id, name: member_name, save_device_id: true });
    }

    goToMemberCreate() {

        console.log('goToMemberCreate');

        console.log(this.state.group_id);
        console.log(this.state.group_name);
        
        this.props.navigation.navigate("memberCreate", { group_id: this.state.group_id, group_name: this.state.group_name });

        //let member_id = data.split('|')[0];
        //let member_name = data.split('|')[2];


        // console.log(data);
        // console.log(member_id);
        // console.log(member_name);
        
        // //save unique device id of member
        
    }


    handleOnNavigateBack = () => {
        this.queryMembers();
    }

    renderCellStyle(idx) {
        switch (idx) {
            case 0:
                return {
                    flex: 1
                }
            default:
                return {
                    flex: 6
                }
        }
    }

    renderCellElement(data, rowIndex, columnIndex) {
        let src = data.split('|')[1];
        let name = data.split('|')[2];
        switch (columnIndex) {
            case 0:
                return <TouchableOpacity onPress={() => this.goToMemberDetail(data)}>
                           <View style={{justiftyContent:"center", alignItems:"center"}}>
                               <Image source={{ uri: getAvatarImageUrl(src) }} style={{ width: 27, height: 35 }}></Image>
                           </View>
                        </TouchableOpacity>
            default:
                return <TouchableOpacity onPress={() => this.goToMemberDetail(data)}>
                            <Text>{name}</Text>
                       </TouchableOpacity>
        }
    }

    render() {

        const state = this.state;

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        if (this.state.loading == false && this.state.tableData.length == 0) {
            return (
                <View style={styles.container}>
                    <Text>No members yet</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.headertextwrapper}>
                        <Text style={styles.headertext}>Find your name below or <Text style={{ color: 'red' }} onPress={() => { this.goToMemberCreate() }}>tap here</Text> to join {this.state.group_name}.</Text>
                    </View>
                    <ScrollView>
                        <Table borderStyle={{ borderColor: 'transparent' }}>
                            {
                                state.tableData.map((rowData, rowIndex) => (
                                    <TableWrapper key={rowIndex} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell
                                                    key={cellIndex}
                                                    data={this.renderCellElement(cellData, rowIndex, cellIndex)}
                                                    style={[this.renderCellStyle(cellIndex), { borderBottomColor: '#ccc', borderTopWidth: 1 }]}
                                                />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: '2%',
        backgroundColor: '#fff'
    },
    headertextwrapper: {
        padding: 10
    },
    headertext: {
        fontSize: 16
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
        borderRadius: 2
    },
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