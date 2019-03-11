import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

export default class MemberGroupSelect extends Component {

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

        this.memberGroupsRef = firebase.firestore().collection("groups");

        this.state = {
            memberGroups: [],
            loading: true
        }
    }

    
    componentDidMount() {
        this.queryMemberGroups();
    }

    queryMemberGroups() {
        this.memberGroupsRef.get().then(data => this.onCollectionUpdate(data));
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
            memberGroups: groups,
            loading: false
        });
    };

    handleOnNavigateBack = () => {
        this.queryMemberGroups();
    }

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
                            this.state.memberGroups.map((memberGroup, index) => (
                                <View key={index} style={styles.rowbtns}>
                                    <Button
                                        mode="contained"
                                        key={index}
                                        //onPress={() => this.props.navigation.navigate("MemberList", { group_id: userGroup.id, group_name: userGroup.name, onNavigateBack: this.handleOnNavigateBack })}
                                    >
                                        {memberGroup.name}
                                    </Button>
                                </View>
                            ))
                        }
                        <View style={styles.rowbtns}>
                            <Button
                                mode="contained"
                                onPress={() => this.props.navigation.navigate('memberEnterCode')}
                            >
                            New (I have a code)
                            </Button>
                        </View>
                        <View style={styles.rowbtns}>
                            <Button
                                //onPress={() => this.signOutUser()}
                                onPress={() => this.props.navigation.navigate('InitNavigator')}
                            >
                            Back
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