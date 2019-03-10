import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";
import { Button, Headline } from "react-native-paper";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("users");
  }
  state = { currentUser: null, UserInfo: [], loading: true };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    //console.log("*****1" + JSON.stringify(currentUser, undefined, 4));

    this.setState({ currentUser });
    this.UserInformation = this.ref.where("email", "==", currentUser.email);
    //console.log(currentUser.email);
    
    this.UserInformation.get().then(data => this.onCollectionUpdate(data));
  }

  NavigateToGroups = () => {
    this.props.navigation.navigate("NavOrganizer");
  };

  signOutUser = async() => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  onCollectionUpdate = querySnapshot => {

    const UserInfo = [];

    querySnapshot.forEach(doc => {

      const {
        email,
        first_name,
        last_name,
        city,
        state
      } = doc.data();

      UserInfo.push({
        email,
        first_name,
        last_name,
        city,
        state
      });
    });

    this.setState({
      UserInfo,
      loading: false
    });
  };

  render() {

    if (this.state.loading) {
      return null; // or render a loading icon
    }
    
    const { currentUser, UserInfo } = this.state;
    console.log("*****6" + UserInfo);
    
    if(UserInfo.length == 0)
      this.signOutUser(currentUser);

    return (
      <View style={styles.container}>
        <View style={styles.informationContainer}>
          <View style={{ margin: "5%" }}>
            <View style={styles.textField}>
              <Text style={{ fontWeight: "bold" }}>Logged in organizer: </Text><Text>{UserInfo[0].first_name} {UserInfo[0].last_name}</Text>
            </View>
            <View style={styles.textField}>
              <Text style={{ fontWeight: "bold" }}>Email: </Text>
              <Text>{UserInfo[0].email}</Text>
            </View>
            <View style={styles.textField}>
              <Text style={{ fontWeight: "bold" }}>City: </Text>
              <Text>{UserInfo[0].city}, {UserInfo[0].state}</Text>
            </View>
            <View style={styles.rowbtns}>
              <Button
                mode="contained"
                onPress={() => this.NavigateToGroups()}
              >
                Next
            </Button>
            </View>
            <View style={styles.rowbtns}>
              <Button
                mode="contained"
                onPress={() => this.signOutUser(currentUser)}
              >
                Signout
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textField: {
    flexDirection: "row"
  },
  informationContainer: {
    height: "90%",
    justifyContent: "center"
  },
  contactBox: {
    height: "10%",
    alignItems: "center",
    padding: "2%"
  },
  rowbtns: {
    paddingTop: "2%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  btnstyle: {
    height: 50,
    width: 150,
    justifyContent: "center"
  }
});
