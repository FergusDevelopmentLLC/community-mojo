import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, StyleSheet, Picker } from 'react-native';
import { TextInput, Appbar, Button } from 'react-native-paper';

export default class SkillCreate extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title='Add reward' />
                </Appbar.Header>
            ),
        };
    };

    constructor(props) {

        super(props);

        this.state = {
            name: '',
            note: '',
            user_name: '',
            points: null,
            group_id: 0,
            member_id: 0,
            member: null,
            errorMessage: null,
            loading: false,
            toast: false
        };

        let group_id = this.props.navigation.getParam('group_id', '0');
        let member_id = this.props.navigation.getParam('member_id', '0');

        this.memberRef = firebase.firestore().collection('groups').doc(group_id).collection('members').doc(member_id);
        this.userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    }

    componentWillMount(){

        this.setState({ member_id: this.props.navigation.getParam('member_id', '0') });
        
        this.setState({ group_id: this.props.navigation.getParam('group_id', '0') });

        this.memberRef.get().then(doc => { 
            this.setState({
                member: doc._data
            });  
        });

        this.userRef.get().then(doc => { 
            this.setState({
                user_name: doc._data['first_name'] + ' ' + doc._data['last_name']
            });  
        });

    }


    handleCreateSkill = () => {

        this.setState({ loading: true });
        let dateCreated = firebase.database.ServerValue.TIMESTAMP;

        const skill = {
            name: this.state.name,
            awarded_by_user: this.state.user_name,
            points: this.state.points,
            note: this.state.note,
            award_time: dateCreated
        }

        const skill_root = {
            name: this.state.name,
            points: this.state.points
        }

        //get id of new skill
        const newSkillRef = firebase.firestore().collection('skills').doc();
        const newSkillId = newSkillRef.id;

        //set up a batch of writes
        const batch = firebase.firestore().batch();

        //write the member skill full reference
        const memberSkillsRef = firebase.firestore().collection('groups').doc(this.state.group_id).collection('members').doc(this.state.member_id).collection('skills').doc(newSkillId);
        batch.set(memberSkillsRef, skill);

        //write the root skill with reference to this user's award instance
        const skillsRef = firebase.firestore().collection('skills').doc(newSkillId);
        skill.refs = [];
        skill.refs.push(memberSkillsRef);
        batch.set(skillsRef, skill_root);

        batch.commit()
            .then(() => {
                console.log(this.state);
                //this.props.navigation.state.params.onNavigateBack(); //this calls handleOnNavigateBack in MeetupSelect
                this.props.navigation.navigate('MemberDetail', { group_id: this.state.group_id , member_id: this.state.member_id, name: this.state.member['first_name'] + ' ' + this.state.member['last_name'] });
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
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                mode='outlined'
                                autoCapitalize='none'
                                label='For what?'
                                style={{ width: '60%' }}
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            />
                            <Picker
                                selectedValue={this.state.points}
                                style={{ width: '40%', margin: 10, height: 40 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ points: itemValue })}>
                                <Picker.Item label='Points' value='0' />
                                <Picker.Item label='1' value='1' />
                                <Picker.Item label='2' value='2' />
                                <Picker.Item label='3' value='3' />
                                <Picker.Item label='4' value='4' />
                                <Picker.Item label='5' value='5' />
                                <Picker.Item label='6' value='6' />
                                <Picker.Item label='7' value='7' />
                                <Picker.Item label='8' value='8' />
                                <Picker.Item label='9' value='9' />
                            </Picker>
                        </View>
                        <View>
                            <TextInput
                                mode='outlined'
                                autoCapitalize='none'
                                label='Note'
                                style={{ width: '100%', height: 80 }}
                                onChangeText={note => this.setState({ note })}
                                value={this.state.note}
                            />
                        </View>
                        <View style={styles.loginbtns}>
                            <Button
                                disabled={
                                    this.state.name.length === 0 ||
                                    this.state.points == 0
                                  }
                                mode='contained'
                                loading={this.state.loading}
                                onPress={this.handleCreateSkill}
                            >
                            Add reward
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