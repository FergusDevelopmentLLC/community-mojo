import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";

export default class MeetupSelect extends Component {
   constructor(props) {

      super(props);

      // var query = this.UserGroupsRef.orderByKey().equalTo('F4GubhZKqWcJnHahL0TQTOP62Jj1');
      // query.once("value", function(snapshot) {
      //    snapshot.forEach(function(child) {
      //       console.log(child);
      //      //console.log(child.key, child.val().bio);
      //    });
      //  });

      // var userId = firebase.auth().currentUser.uid;
      // firebase.database().ref('/User/' + userId).once('value').then(function(snapshot) {
      //    console.log(snapshot.val())
      // });
      
      this.ref = firebase.firestore().collection("UserGroups");

      this.state = {
         groups: []
      };
   }
   
   
   componentDidMount() {

      const { currentUser } = firebase.auth();
      this.setState({ currentUser });
      this.UserGroupsInformation = this.ref.where("CreatedBy", "==", currentUser.uid);
      this.CreatedQueues.get().then(data => this.onCollectionUpdate(data));

      //this.UserGroupsInformation = this.userGroupsRef.where(key, "==", firebase.auth().id);
      //this.UserGroupsInformation.get().then(data => this.onCollectionUpdate(data));
      
      //console.log(firebase.auth().currentUser.uid);
      //console.log('here3');

      // this.UserGroupsRef.child('decentralize_colorado').on('child_added', snap => {
      //    console.log(snap.key);
      // });

      //this.GroupInformation = this.GroupsRef;

      //this.UserGroupsInformation.get().then(data => this.onCollectionUpdate(data));
      //this.UserGroupsInformation = this.UserGroupsRef

      
      // this.userGroupsRef.on('value',function(snapShot){
      //    console.log(snapShot);
      //  }.bind(this));
      

      //this.GroupInformation = this.UserGroupsRef.child('F4GubhZKqWcJnHahL0TQTOP62Jj1');
      //this.GroupInformation.get().then(data => this.onCollectionUpdate(data));
      //("database/username").equalTo("some_data");

      //const rootRef = firebase.database().ref();
      //const UserGroupsRef = rootRef.child('UserGroups');
      //const GroupsRef = rootRef.child('Group');

      // const UserGroupsRef = firebase.database().ref('UserGroups');
      // UserGroupsRef.on('value', function(snapshot) {
      //    console.log(snapshot);
      //    console.log(snapshot.val());
      //  });

      // var query = this.UserGroupsRef.orderByKey().equalTo('F4GubhZKqWcJnHahL0TQTOP62Jj1');
      // query.once("value", function(snapshot) {
      //    snapshot.forEach(function(child) {
      //       console.log(child);
      //    });
      // });

      // firebase.database().ref('UserGroups/WQQZ6pcMMgQoTxH9cr2XGaPOq9W2')
      //    .once('value')
      //    .then(function(snapshot) {
      //       console.log(snapshot);
      //       var value = snapshot.val();
      //       // console.log('location:', value.account_capabilities);
      //       // resp.json(value.account_capabilities);
      //       console.log(value);
      //    });

      // var userGroups = firebase.firestore().collection('UserGroups').doc('F4GubhZKqWcJnHahL0TQTOP62Jj1');
      // userGroups.get().then((doc) => {
      //    console.log(doc._data);
      //  });
       
      // var ref = firebase.database().ref('UserGroups/WQQZ6pcMMgQoTxH9cr2XGaPOq9W2');
      // ref.once("value")
      //    .then(function(snapshot) {
      //       console.log(snapshot._data);
      //    });

   }


   onCollectionUpdate = querySnapshot => {

        const grps = [];

        querySnapshot.forEach(doc => {

          const {
            name,
            city,
            state
          } = doc.data();

          let group = {};
          group.name = name;
          group.city = city;
          group.state = state;

          grps.push(group);

        });

        this.setState({
         groups: grps
        });
   };


   alertId(id) {
      //Alert.alert(`${id}`);
      //this.props.navigation.navigate("MemberDetail", { id });
   }


   render() {
      return (
         <View style={styles.container}>
            <View style={styles.informationContainer}>
               {
                  this.state.groups.map((item, index) => (
                     <Button
                        style={[
                           styles.btnstyle
                        ]}
                        mode="contained">
                        {item.name}
                     </Button>
                  ))
               }
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 3,
    },
    informationContainer: {
      flexDirection: "column",
      alignItems: "center",
      height: "90%",
      justifyContent: "center"  
    },
   text: {
      color: '#4f603c'
   },
   btnstyle: {
      marginTop: "1%"
   }
})