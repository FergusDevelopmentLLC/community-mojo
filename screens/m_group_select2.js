import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

export default class MemberGroupSelect extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.Content 
                        titleStyle = {styles.titleStyle}
                        title='Select your meetup.' />
                </Appbar.Header>
            ),
        };
    };
    
    constructor(props) {

        super(props);
        
        this.state = {
            memberGroups: [],
            loading: false
        }
    }

    
    componentDidMount() {
        
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
                        <View style={styles.rowbtns}>
                            <Button
                                mode="contained"
                                onPress={() => this.props.navigation.navigate("membersViewGroup", { group_id: 'decentralize_co', group_name: 'Decentralize Colorado' })}
                            >
                                Decentralize Colorado
                            </Button>
                        </View>
                        <View style={styles.rowbtns}>
                            <Button
                                mode="contained"
                                onPress={() => this.props.navigation.navigate('memberEnterCode')}
                            >
                            I have a code
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