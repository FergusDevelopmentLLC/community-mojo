import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, StyleSheet, Picker, Alert } from 'react-native';
import { TextInput, Appbar, Button } from 'react-native-paper';


export default class MemberEnterGroup extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title='Enter code to sign in' />
                </Appbar.Header>
            ),
        };
    };

    constructor(props) {

        super(props);

        this.state = {
            code: '',
            is_button_disabled: true,
            errorMessage: null,
            loading: false,
            toast: false
        };
    }


    handleCheckCode = async () => {
        this.setState({ loading: true });
        let matching_group_query = await firebase.firestore().collection('groups').where("member_code", "==", this.state.code).get();

        if(matching_group_query._docs.length > 0) {
            let group_id = matching_group_query._docs[0].id;
            let group_name = matching_group_query._docs[0].name;
            this.props.navigation.navigate('memberPick', {group_id: group_id, group_name: group_name});
        }
        else {
            //show error
        }

    };

    //TODO fix this...
    handleCodeChange = (value) => {
        this.setState({ code: value });
        (value.length > 5) ?  this.setState({ is_button_disabled: false }) :  this.setState({ is_button_disabled: true })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.informationContainer}>
                    <View style={styles.textinput}>
                        
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                mode='outlined'
                                autoCapitalize='none'
                                label='Enter member code'
                                style={{ width: '100%' }}
                                autoCapitalize="characters"
                                onChange={(event) => this.handleCodeChange( event.nativeEvent.text )}
                                value={this.state.code}
                            />
                        </View>
                        
                        <View style={styles.loginbtns}>
                            <Button
                                mode='contained'
                                disabled={this.state.is_button_disabled}
                                loading={this.state.loading}
                                onPress={() => this.handleCheckCode()}
                            >
                            Check code
                            </Button>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    informationContainer: {
        height: '90%',
        justifyContent: 'center'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#337ab7',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    },
    textinput: {
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'flex-end'
    },
    loginbtns: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});