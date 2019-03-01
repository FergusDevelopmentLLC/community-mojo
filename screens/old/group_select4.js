import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { Text } from 'react-native';

export default class GroupSelect extends Component {
    constructor(props) {

        super(props);

        this.userGroupRef = firebase.firestore().collection('UserGroups').where('UserId', '==', firebase.auth().currentUser.uid);
        
        this.state = {
            userGroups: []
        }
    }
    
    componentDidMount() {

        this.userGroupRef.get().then((userGroupsDocs) => {
            
            let promises = [];
            userGroupsDocs.forEach((userGroupDoc) => {
                promises.push(firebase.firestore().collection('Group').doc(userGroupDoc._data['GroupId']).get());
            })

            let groups = [];

            let that = this; 
            
            Promise.all(promises).then(function(docs) {
                
                docs.forEach((groupDoc) => {
                    let group = {};
                    group.name = groupDoc._data['name'];
                    group.city = groupDoc._data['city'];
                    group.state = groupDoc._data['state'];
                    groups.push(group);
                });

                that.setState({
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