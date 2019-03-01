import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

    export default class GroupSelect extends Component {

        static navigationOptions = ({ navigation }) => {
    
            return {
              header: (
                <Appbar.Header>
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                  <Appbar.Content title='Select Your Meetup'/>
                </Appbar.Header>
              ),
            };
          };


        constructor(props) {

            super(props);

            console.log(firebase.auth().currentUser.uid);
            this.userGroupRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("groups");

            this.state = {
                userGroups: []
            }
        }


        componentDidMount() {

            this.userGroupRef.get().then((doc) => {
                
                let groups = [];
        
                doc._docs.forEach(function (groupDoc) {
                    let group = {};
                    group.id = groupDoc._ref.id;
                    group.name = groupDoc._data['name'];
                    groups.push(group);
                });

                this.setState({
                    userGroups: groups
                });
        
            });
            
        }

        render() {
            return (
                <View style={styles.container}>
                    <View style={styles.informationContainer}>
                        {
                            this.state.userGroups.map((userGroup, index) => (
                                <View key={index} style={styles.rowbtns}>
                                    <Button 
                                        mode="contained" 
                                        key={index} 
                                        onPress={() => this.props.navigation.navigate("MemberList", { group_id: userGroup.id, group_name:userGroup.name })}
                                        >
                                        {userGroup.name} ccc
                                        </Button>
                                </View>
                            ))
                        }
                        <View style={styles.rowbtns}>
                            <Button
                                mode="contained" 
                                onPress={() => this.props.navigation.navigate("MemberList", { group_id: '0' })}
                                >
                                New
                            </Button>
                        </View>
                    </View>
                </View>
            )
        }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff"
        },
        informationContainer: {
          height: "90%",
          justifyContent: "center"
        },
        title: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          color: "#337ab7",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 17
        },
        rowbtns: {
          paddingTop: "2%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }
      });