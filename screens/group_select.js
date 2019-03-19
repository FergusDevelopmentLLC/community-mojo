import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

export default class GroupSelect extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.Content 
                        titleStyle = {styles.titleStyle}
                        title='Select your meetup' />
                </Appbar.Header>
            ),
        };
    };
    
    constructor(props) {

        super(props);

        let user_id = this.props.navigation.getParam('user_id', firebase.auth().currentUser.uid);

        this.userGroupsRef = firebase.firestore().collection("groups");

        this.state = {
            userGroups: [],
            loading: true
        }
    }


    componentDidMount() {
        this.queryGroups();
    }

    queryGroups() {
        this.userGroupsRef.get().then(data => this.onCollectionUpdate(data));
    }

    onCollectionUpdate = querySnapshot => {

        let groups = [];

        querySnapshot.forEach(doc => {

            const {
                city,
                name
            } = doc.data();

            let group = {};
            group.id = doc.id;
            group.city = city;
            group.name = name;

            groups.push(group);

        });

        this.setState({
            userGroups: groups,
            loading: false
        });
    };

    handleOnNavigateBack = () => {
        this.queryGroups();
    }

    signOutUser = async() => {
        try {
          await firebase.auth().signOut();
        } catch (e) {
          console.log(e);
        }
      };

    render() {
        const state = this.state;
        if(this.state.loading) {
            return (
              <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
          }
          else {
            return (
                <View style={styles.container}>
                    <View style={styles.informationContainer}>
                        {
                            this.state.userGroups.map((userGroup, index) => (
                                <View key={index} style={styles.rowbtns}>
                                    <Button
                                        mode="contained"
                                        key={index}
                                        onPress={() => this.props.navigation.navigate("MemberList", { group_id: userGroup.id, group_name: userGroup.name, onNavigateBack: this.handleOnNavigateBack })}
                                    >
                                        {userGroup.name}
                                    </Button>
                                </View>
                            ))
                        }
                        <View style={styles.rowbtns}>
                            <Button
                                mode="contained"
                                onPress={() => this.props.navigation.navigate('GroupCreate', { onNavigateBack: this.handleOnNavigateBack })}
                            >
                            New
                            </Button>
                        </View>
                        <View style={styles.rowbtns}>
                            <Button
                                onPress={() => this.signOutUser()}
                            >
                            Sign out
                            </Button>
                        </View>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    titleStyle: {
        color: "#fff"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: '2%'
    },
    informationContainer: {
        height: "90%",
        justifyContent: "center"
    },
    rowbtns: {
        paddingTop: "2%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});