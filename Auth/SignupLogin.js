import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Appbar } from 'react-native-paper';


export default class SignupLogin extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.Content title='Select your meetup' />
                </Appbar.Header>
            ),
        };
    };
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View style={styles.container}>
              <View style={styles.informationContainer}>
                  <View style={styles.rowbtns}>
                    <Button
                        mode="contained"
                        onPress={() => this.props.navigation.navigate("SignUp")}
                        style={styles.btnstyle}
                      >
                        Create organizer account
                    </Button>
                  </View>
                  <View style={styles.rowbtns}>
                    <Button
                        mode="contained"
                        onPress={() => this.props.navigation.navigate("Login")}
                        style={styles.btnstyle}
                      >
                        I Have an Account
                      </Button>
                    </View>
              </View>
          </View>
        )
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