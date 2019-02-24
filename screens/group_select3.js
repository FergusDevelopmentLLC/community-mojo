import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { Text } from 'react-native';

    export default class GroupSelect extends Component {
        constructor(props) {

            super(props);

            this.userGroupRef = firebase.firestore().collection("User").doc(firebase.auth().currentUser.uid).collection("Groups");

            this.state = {
                userGroups: []
            }
        }


        componentDidMount() {

            this.userGroupRef.get().then((doc) => {
                
                let groups = [];
        
                doc._docs.forEach(function (groupDoc) {
                    let group = {};
                    group.name = groupDoc._data['name'];
                    group.city = groupDoc._data['city'];
                    group.state = groupDoc._data['state'];
                    groups.push(group);
                });

                this.setState({
                    userGroups: groups
                });
        
            });
            
        }

        render() {
            return (
                this.state.userGroups.map((userGroup, index) => (
                    <Text key={index}>{userGroup.name} - {userGroup.city}, {userGroup.state}</Text>
                ))
            )
        }
    }