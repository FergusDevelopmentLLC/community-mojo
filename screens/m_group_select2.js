import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Text } from 'react-native';
import { Button, Appbar } from 'react-native-paper';


export default class MemberGroupSelect extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.Content
                        titleStyle={styles.titleStyle}
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
            loading: false
        }
    }

    componentDidMount() {
        this.queryGroups();
    }

    queryGroups() {
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

    render() {
        const state = this.state;
        if (this.state.loading) {
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
                            this.state.memberGroups.map((group, index) => (
                                <View style={styles.rowbtns}>
                                    <TouchableOpacity style={styles.MeetupButtonStyle} activeOpacity={0.5}>
                                        <Image source={{ uri: 'https://decentralizeco.org/mojo/meetup_icons/cryptoparty.png', }} style={styles.ImageIconStyle} />
                                        <View style={styles.buttontext}>
                                            <Text style={styles.TextStyle}>{group.name.toUpperCase()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        <View style={styles.rowbtns}>
                            <TouchableOpacity
                                style={styles.MeetupButtonStyle}
                                activeOpacity={0.5}
                                onPress={() => this.props.navigation.navigate('memberEnterCode')}
                            >
                                <View style={styles.buttontext}>
                                    <Text style={styles.TextStyle}>I HAVE A CODE</Text>
                                </View>
                            </TouchableOpacity>
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
    },
    buttontext: {
        justifyContent: "center"
    },
    MeetupButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6200EE',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40
    },

    ImageIconStyle: {
        padding: 0,
        height: 38,
        width: 38,
        borderColor: '#6200EE',
        borderWidth: 1,
        resizeMode: 'stretch',
    },
    TextStyle: {
        color: '#fff',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 12,
        marginLeft: 12,
        fontFamily: "normal"

    },
    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40
    },
});