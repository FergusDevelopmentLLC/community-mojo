import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, StyleSheet, Picker, Alert } from 'react-native';
import { TextInput, Appbar, Button } from 'react-native-paper';

export default class MemberCreawte extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title='Tell us about yourself' />
                </Appbar.Header>
            ),
        };
    };

    constructor(props) {

        super(props);

        console.log('here');

        let group_id = this.props.navigation.getParam('group_id', '0');
        console.log('group_id', group_id);

        let group_name = this.props.navigation.getParam('group_name', '');
        console.log('group_name', group_name);

        this.state = {
            first_name: '',
            last_name: '',
            city: '',
            state: '',
            group_id: group_id,
            group_name: group_name,
            is_button_disabled: true,
            errorMessage: null,
            loading: false,
            toast: false
        };
    }

    componentDidMount() {
    }

    handleSave = async () => {

        this.setState({ loading: true });
        
        let existingMembers = await firebase.firestore().collection('members').get();
        let next_avatar = existingMembers._docs.length + 1;

        //there are only 48 alien heads
        if(next_avatar > 48) { next_avatar = 1; }
        
        let next_avatar_img = 'alien.' + next_avatar + '.png';

        const member = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            points: 0,
            city: this.state.city,
            state: this.state.state,
            src: next_avatar_img            
        }

        console.log(member);

        //get id of new member
        let newMemberRef = await firebase.firestore().collection('members').doc();
        let new_member_id = newMemberRef.id;
        
        //set up a batch of writes
        const batch = await firebase.firestore().batch();

        //write the groupMember reference
        const memberGroupRef = await firebase.firestore().collection('groups').doc(this.state.group_id).collection('members').doc(new_member_id);
        await batch.set(memberGroupRef, member);

        //write the root member with reference to the group they joined
        const memberRef = await firebase.firestore().collection('members').doc(new_member_id);
        member.refs = [];
        member.refs.push(memberGroupRef);
        await batch.set(memberRef, member);

        await batch.commit();

        // this.props.navigation.state.params.onNavigateBack(); //this calls handleOnNavigateBack in member.js/MemberDetail
        this.props.navigation.navigate('memberViewDetail', { group_id: this.state.group_id, group_name: this.state.group_name, member_id: new_member_id });
        
    };



    // //TODO fix this...
    handleFirstnameChange = (value) => {
        console.log(value);
        this.setState({ first_name: value });
        (value.length > 0 && this.state.last_name.length > 0 && this.state.city.length > 0 && this.state.state.length > 0 ) ? this.setState({ is_button_disabled: false }) :  this.setState({ is_button_disabled: true })
    }

    handleLastnameChange = (value) => {
        console.log(value);
        this.setState({ last_name: value });
        (value.length > 0 && this.state.first_name.length > 0 && this.state.city.length > 0 && this.state.state.length > 0 ) ? this.setState({ is_button_disabled: false }) :  this.setState({ is_button_disabled: true })
    }

    handleCityChange = (value) => {
        console.log(value);
        this.setState({ city: value });
        (value.length > 0 && this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.state.length > 0 ) ?  this.setState({ is_button_disabled: false }) :  this.setState({ is_button_disabled: true })
    }

    handleStateChange = (value) => {
        console.log(value);
        this.setState({ state: value });
        (value.length > 0 && this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.city.length > 0 ) ?  this.setState({ is_button_disabled: false }) :  this.setState({ is_button_disabled: true })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.informationContainer}>
                    <View style={styles.textinput}>
                        
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                mode='outlined'
                                autoCapitalize="words"
                                label='First name'
                                style={{ width: '100%' }}
                                onChange={(event) => this.handleFirstnameChange( event.nativeEvent.text )}
                                value={this.state.first_name}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                mode='outlined'
                                autoCapitalize="words"
                                label='Last name'
                                style={{ width: '100%' }}
                                onChange={(event) => this.handleLastnameChange( event.nativeEvent.text )}
                                value={this.state.last_name}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                mode="outlined"
                                autoCapitalize="words"
                                label="Home city"
                                style={{ width: '60%' }}
                                onChange={(event) => this.handleCityChange( event.nativeEvent.text )}
                                value={this.state.city} />
                            <Picker
                                selectedValue={this.state.state}
                                style={{ width: '40%', margin: 10, height: 40 }}
                                onValueChange={(itemValue, itemIndex) => this.handleStateChange( itemValue )} >
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
                                mode='contained'
                                disabled={this.state.is_button_disabled}
                                loading={this.state.loading}
                                onPress={this.handleSave}
                            >
                            Save
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