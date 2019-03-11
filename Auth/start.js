import React from "react";
import firebase from "react-native-firebase";
import { View, Text, StyleSheet } from "react-native";
import { Button, Appbar } from 'react-native-paper';

export default class Start extends React.Component {

    static navigationOptions = {
        headerMode: 'none',
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.informationContainer}>

                    <Text style={{ fontSize: 18, color: '#000' }}>I am a community meetup...</Text>

                    <View style={styles.rowbtns}>
                        <Button
                            mode="contained"
                            onPress={() => this.props.navigation.navigate('NavMember')}
                        >
                            
                            Member
                    </Button>
                    </View>
                    <View style={styles.rowbtns}>
                        <Button
                            mode="contained"
                            onPress={() => this.props.navigation.navigate('AuthNavigator')}
                        >
                            Organizer
                    </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: '2%',
        backgroundColor: '#fff'
    },
    informationContainer: {
        height: "90%",
        justifyContent: "center",

    },
    rowbtns: {
        paddingTop: "4%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});