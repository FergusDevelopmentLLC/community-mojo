import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { View, StyleSheet, Picker } from 'react-native';
import { TextInput, Appbar, Button } from "react-native-paper";
import { randomString } from "../helper/helpers";

export default class GroupCreate extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            header: (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title='Create meetup' />
                </Appbar.Header>
            ),
        };
    };

    constructor(props) {

        super(props);

        this.state = {
            meetup_name: '',
            home_city: '',
            state: '',
            errorMessage: null,
            loading: false,
            toast: false
        };
    }

    handleCreateGroup = () => {

        this.setState({ loading: true });

        let code = randomString(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        console.log(code)
      
        const group = {
            city: this.state.home_city,
            name: this.state.meetup_name,
            state: this.state.state,
            code: code
        }

        const groupNoState = {
            city: this.state.home_city,
            name: this.state.meetup_name
        }

        let newGroupRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('groups').doc();
        let newId = newGroupRef.id;
        
        //set up a batch
        var batch = firebase.firestore().batch();

        //write new group to user's groups
        var userGroupsRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('groups').doc(newId);
        batch.set(userGroupsRef, groupNoState);

        //write new group at root level
        var groupsRef = firebase.firestore().collection('groups').doc(newId);
        group.refs = [];
        group.refs.push(userGroupsRef);
        batch.set(groupsRef, group);
        
        //commit batch
        batch.commit()
            .then(() => {
                //make the state of group button list reload from db
                this.props.navigation.state.params.onNavigateBack(); //this calls handleOnNavigateBack in MeetupSelect
                this.props.navigation.navigate('MeetupSelect');
            })
            .catch((err) => {
                console.log(err);
            });
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.informationContainer}>
                    <View style={styles.textinput}>
                        <TextInput
                            mode="outlined"
                            autoCapitalize="words"
                            label="Meetup name"
                            onChangeText={meetup_name => this.setState({ meetup_name })}
                            value={this.state.meetup_name}
                        />

                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                mode="outlined"
                                autoCapitalize="words"
                                label="Home city"
                                style={{ width: '60%' }}
                                onChangeText={home_city => this.setState({ home_city })}
                                value={this.state.home_city}
                            />
                            <Picker
                                selectedValue={this.state.state}
                                style={{ width: '40%', margin: 10, height: 40 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ state: itemValue })
                                }>
                                <Picker.Item label="State" value="" />
                                <Picker.Item label="Alabama" value="AL" />
                                <Picker.Item label="Alaska" value="AK" />
                                <Picker.Item label="Arizona" value="AZ" />
                                <Picker.Item label="Arkansas" value="AR" />
                                <Picker.Item label="California" value="CA" />
                                <Picker.Item label="Colorado" value="CO" />
                                <Picker.Item label="Connecticut" value="CT" />
                                <Picker.Item label="Delaware" value="DE" />
                                <Picker.Item label="Florida" value="FL" />
                                <Picker.Item label="Georgia" value="GA" />
                                <Picker.Item label="Hawaii" value="HI" />
                                <Picker.Item label="Idaho" value="ID" />
                                <Picker.Item label="Illinois" value="IL" />
                                <Picker.Item label="Indiana" value="IN" />
                                <Picker.Item label="Iowa" value="IA" />
                                <Picker.Item label="Kansas" value="KS" />
                                <Picker.Item label="Kentucky" value="KY" />
                                <Picker.Item label="Louisiana" value="LA" />
                                <Picker.Item label="Maine" value="ME" />
                                <Picker.Item label="Maryland" value="MD" />
                                <Picker.Item label="Massachusetts" value="MA" />
                                <Picker.Item label="Michigan" value="MI" />
                                <Picker.Item label="Minnesota" value="MN" />
                                <Picker.Item label="Mississippi" value="MS" />
                                <Picker.Item label="Missouri" value="MO" />
                                <Picker.Item label="Montana" value="MT" />
                                <Picker.Item label="Nebraska" value="NE" />
                                <Picker.Item label="Nevada" value="NV" />
                                <Picker.Item label="New Hampshire" value="NH" />
                                <Picker.Item label="New Jersey" value="NJ" />
                                <Picker.Item label="New Mexico" value="NM" />
                                <Picker.Item label="New York" value="NY" />
                                <Picker.Item label="North Carolina" value="NC" />
                                <Picker.Item label="North Dakota" value="ND" />
                                <Picker.Item label="Ohio" value="OH" />
                                <Picker.Item label="Oklahoma" value="OK" />
                                <Picker.Item label="Oregon" value="OR" />
                                <Picker.Item label="Pennsylvania" value="PA" />
                                <Picker.Item label="Rhode Island" value="RI" />
                                <Picker.Item label="South Carolina" value="SC" />
                                <Picker.Item label="South Dakota" value="SD" />
                                <Picker.Item label="Tennessee" value="TN" />
                                <Picker.Item label="Texas" value="TX" />
                                <Picker.Item label="Utah" value="UT" />
                                <Picker.Item label="Vermont" value="VT" />
                                <Picker.Item label="Virginia" value="VA" />
                                <Picker.Item label="Washington" value="WA" />
                                <Picker.Item label="West Virginia" value="WV" />
                                <Picker.Item label="Wisconsin" value="WI" />
                                <Picker.Item label="Wyoming" value="WY" />
                            </Picker>

                        </View>

                        <View style={styles.loginbtns}>
                            <Button
                                disabled={
                                    this.state.meetup_name.length === 0 ||
                                    this.state.home_city.length === 0 ||
                                    this.state.state.length === 0
                                  }
                                mode='contained'
                                loading={this.state.loading}
                                onPress={this.handleCreateGroup}
                            >
                            Create meetup
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
        backgroundColor: "#fff"
    },
    informationContainer: {
        height: "90%",
        justifyContent: "center"
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "#337ab7",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 17
    },
    textinput: {
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "flex-end"
    },
    loginbtns: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});