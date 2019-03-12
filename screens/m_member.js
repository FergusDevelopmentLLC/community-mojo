import React, { Component } from 'react';
import firebase from "react-native-firebase";
import { StyleSheet, Text, View, FlatList, Dimensions, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { getAvatarImageUrl } from "../helper/helpers";

export default class memberViewDetail extends Component {
    
    static navigationOptions = {
        headerMode: 'none',
        header: null
    };

    // static navigationOptions = ({ navigation }) => {
    //     //navigation.state.params.onNavigateBack();
    //     return {
    //         header: (
    //             <Appbar.Header>
    //                 <Appbar.BackAction onPress={() => navigation.goBack()} />
    //                 <Appbar.Content title={navigation.state.params.name} />
    //             </Appbar.Header>
    //         ),
    //     };
    // };

    constructor(props) {

        super(props);

        let group_id = this.props.navigation.getParam('group_id', '0');
        let member_id = this.props.navigation.getParam('member_id', '0');
        let save_device_id = this.props.navigation.getParam('save_device_id', false);

        this.state = {
            id: 0,
            numColumns: 4,
            member: null,
            group_id: group_id,
            member_id: member_id,
            save_device_id: save_device_id,
            member: null,
            group: null,
            skillwidth: null,
            skills: []
        };

        this.groupRef = firebase.firestore().collection('groups').doc(group_id);
        this.memberRef = firebase.firestore().collection('groups').doc(group_id).collection('members').doc(member_id);
        this.memberRootRef = firebase.firestore().collection('members').doc(member_id);
        this.skillsRef = firebase.firestore().collection('groups').doc(group_id).collection('members').doc(member_id).collection('skills');

        this.membersRootClearDeviceIdRef = firebase.firestore().collection('members').where("device_id", "==", this.state.device_id);
        this.membersGroupClearDeviceIdRef = firebase.firestore().collection('groups').doc(group_id).collection('members').where("device_id", "==", this.state.device);
    }


    async componentDidMount() {

        //console.log(this.state.save_device_id);

        //any members current members tagged with device id?
        //let rootMembersClearDeviceId = await this.membersRootClearDeviceIdRef.get();
        //console.log(rootMembersClearDeviceId);

        // if(this.state.save_device_id) {
        //     let update = { device_id: this.state.device_id };
        //     await this.memberRef.update(update);
        //     await this.memberRootRef.update(update);
        // }
        
        this.queryGroup();

        this.queryMember();

        this.querySkills();

    }

    queryGroup() {
        this.groupRef.get().then(doc => {
            this.setState({
                group: doc._data
            });
        });
    }

    queryMember() {
        this.memberRef.get().then(doc => {
            this.setState({
                member: doc._data
            });
        });
    }

    querySkills() {
        this.skillsRef.get().then(data => this.onSkillsCollectionUpdate(data));
    }

    onSkillsCollectionUpdate = querySnapshot => {

        const skills = [];

        querySnapshot.forEach(doc => {

            const {
                name,
                points
            } = doc.data();

            let skill = {};
            skill.name = doc._data.name;
            skill.points = doc._data.points;
            skills.push(skill);
        });

        // const addskill = {};
        // addskill.name = 'Add reward';
        // addskill.points = 0;
        // skills.push(addskill);

        this.setState({
            skills: skills
        });
    };

    onCollectionUpdate = querySnapshot => {
        this.setState({
            member: querySnapshot._data,
        });
    };

    formatData = (data, numColumns) => {

        const numberOfFullRows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }

        return data;
    };


    handleOnNavigateBack = () => {
        this.queryMember();
        this.querySkills();
    }

    renderItem = ({ item, index, numColumns }) => {

        const sideWidth = (Dimensions.get('window').width - 160) / 4

        //TODO fix this... https://stackoverflow.com/questions/39293781/understanding-firebase-storage-tokens
        //use getDownloadUrl
        let token = '';
        let badge_image = '';

        if (item.points == 0 && item.name == 'Add reward') {
            badge_image = 'plus.png';
            token = 'a30159e8-4aac-41b5-967d-8d26cfae8082';
        }
        else if (item.points == 1) {
            badge_image = 'coin1.png';
            token = '02ccc924-6f5d-4408-be29-b004cef5fa23';
        }
        else if (item.points == 2) {
            badge_image = 'coin2.png'
            token = '15c79eca-5b32-47ed-b3f3-386e1cfe93f8';
        }
        else if (item.points == 3) {
            badge_image = 'coin3.png'
            token = 'deff3ffe-68f9-49f3-a40a-86677444c782';
        }
        else {
            badge_image = 'coinsack.png'
            token = 'e4859589-da09-4dc8-8d4f-aab958df0fb3';
        }

        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        else if (item.name === 'Add reward') {
            return (
                <TouchableOpacity onPress={() => this.goToCreateSkill(item.name)} style={styles.item}>
                    <View>
                        <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/community-mojo.appspot.com/o/' + badge_image + '?alt=media&token=' + token }} style={{ width: sideWidth, height: sideWidth }}>
                            <View style={{ position: 'absolute', top: 1.5, left: 37, right: 0, bottom: 0 }}>
                                <Text style={styles.pointText}>{item.points}</Text>
                            </View>
                        </ImageBackground>
                        <Text key={index} style={styles.itemText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <View style={styles.item}>
                    <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/community-mojo.appspot.com/o/' + badge_image + '?alt=media&token=' + token }} style={{ width: sideWidth, height: sideWidth }}>
                        <View style={{ position: 'absolute', top: 1.5, left: 37, right: 0, bottom: 0 }}>
                            <Text style={styles.pointText}>{item.points}</Text>
                        </View>
                    </ImageBackground>
                    <Text key={index} style={styles.itemText}>{item.name}</Text>
                </View>
            );
        }
    };

    render() {

        let user_name = '';
        let group_name = '';

        if (this.state.group && this.state.group['name']) { group_name = this.state.group['name']; }
        if (this.state.member) {
            if (this.state.member['first_name'] && this.state.member['last_name']) { user_name = this.state.member['first_name'] + ' ' + this.state.member['last_name'] }
            return (
                <View style={styles.container}>
                    <View style={styles.justifycontainer}>
                        <Image source={{ uri: getAvatarImageUrl(this.state.member['src']) }} style={{ width: 81, height: 105 }}></Image>
                    </View>
                    <View style={styles.namecontainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>{user_name}</Text>
                    </View>
                    <View style={styles.groupcontainer}>
                        <Button 
                        onPress={() => this.props.navigation.navigate('membersViewGroup', { group_id: this.state.group_id, group_name: group_name })}>{group_name}</Button>
                    </View>
                    <View style={styles.balancecontainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>${this.state.member['points']}</Text>
                    </View>
                    <FlatList
                        data={this.formatData(this.state.skills, this.state.numColumns)}
                        style={styles.skillscontainer}
                        renderItem={this.renderItem}
                        numColumns={this.state.numColumns}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                
            )
        } else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    skillscontainer: {
        flex: 1,
        padding: 10,
        paddingTop: 5,
        backgroundColor: '#fff'
    },
    justifycontainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    namecontainer: {
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    balancecontainer: {
        marginTop: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head: {
        height: 30,
    },
    text: {
        margin: 6
    },
    row: {
        flexDirection: 'row',
        height: 50
    },
    btnBox: {
        flexDirection: 'row'
    },
    avatar: {
        width: 26,
        height: 34
    },
    btn: {
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        lineHeight: 26
    },
    imgCell: {
        lineHeight: 26
    },
    image: {
        width: 50,
        height: 50
    },
    flcontainer: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: (Dimensions.get('window').width - 50) / 4, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#000000',
        fontSize: 9.5,
        marginTop: 2
    },
    pointText: {
        color: '#fff',
        fontSize: 10
    }
});