import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { Text } from 'react-native';

    export default class GroupSelect extends Component {
        constructor(props) {

            super(props);

            this.userGroupRef = firebase.firestore().collection("UserGroups").doc(firebase.auth().currentUser.uid);

            this.state = {
                userGroups: []
            }
        }
        
        componentDidMount() {

            this.userGroupRef.get().then((doc) => {

                var obj = doc._data;
                
                var group_ids = Object.keys(obj).map(function (key) {
                    return key;
                });

                let promises = [];
                group_ids.forEach(function (group_id) {

                    //making a singleton database call for each group id, maybe not good.
                    promises.push(firebase.firestore().collection('Group').doc(group_id).get())

                });

                let groups = [];

                let parentThis = this; //get ref to parent this to set in Promise.all below, kinda weird

                Promise.all(promises).then(function(docs) {
                    
                    docs.forEach((groupDoc) => {
                        let group = {};
                        group.name = groupDoc._data['name'];
                        group.city = groupDoc._data['city'];
                        group.state = groupDoc._data['state'];
                        groups.push(group);
                    });

                    parentThis.setState({
                        userGroups: groups
                    });
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