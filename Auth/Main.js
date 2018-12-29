import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";
import { Button, Headline } from "react-native-paper";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("User");
  }
  state = { currentUser: null, UserInfo: [], loading: true };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    //console.log("*****1" + JSON.stringify(currentUser, undefined, 4));

    this.setState({ currentUser });
    this.UserInformation = this.ref.where("email", "==", currentUser.email);
    console.log(currentUser.email);
    //console.log("*****2 this.UserInformation: " + JSON.stringify(this.UserInformation));
    //console.log("*****2.5 this.UserInformation: " + JSON.stringify(this.UserInformation, getCircularReplacer()));
    //console.log("*****2.6 this.UserInformation: " + Object.keys(this.UserInformation));
    //console.log("*****2.7");
    //console.log(Object.keys(this.UserInformation));

    this.UserInformation.get().then(data => this.onCollectionUpdate(data));
  }

  NavigateToGroups = () => {

    // if (this.state.UserInfo[0].UserType == "Organizer") {
    //   this.props.navigation.navigate("DrawerNavOrganizer");
    // } else this.props.navigation.navigate("DrawerNavMember");

    this.props.navigation.navigate("DrawerNavOrganizer");
  };

  signOutUser = async() => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  onCollectionUpdate = querySnapshot => {

    console.log("**** onCollectionUpdate");
    //console.log("**** querySnapshot: " + JSON.stringify(querySnapshot));

    /*
    console.log("*****8");
    console.log(Object.keys(querySnapshot));
    console.log("_changes");
    console.log(querySnapshot._changes);
    console.log("_docs");
    console.log(querySnapshot._docs);
    console.log("_metadata");
    console.log(querySnapshot._metadata);
    console.log("_query");
    console.log(querySnapshot._query);
    */

    const UserInfo = [];

    querySnapshot.forEach(doc => {

      console.log("*****3" + doc);

      const {
        email,
        first_name,
        last_name,
        city,
        state
      } = doc.data();

      UserInfo.push({
        // DocumentSnapshot
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

    console.log("*****4 Main.js render");

    if (this.state.loading) {
      return null; // or render a loading icon
    }
    const { currentUser, UserInfo } = this.state;
    console.log("*****5" + currentUser);
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

{/* <View style={{ paddingTop: 10 }}>
  <View style={styles.textField}>
    <Text style={{ fontWeight: "bold" }}>Somaiya Email ID: </Text>
    <Text>{UserInfo[0].email}</Text>
  </View>
  <View style={styles.textField}>
    <Text style={{ fontWeight: "bold" }}>Department: </Text>
    <Text>{UserInfo[0].department}</Text>
  </View>
  <View style={styles.textField}>
    <Text style={{ fontWeight: "bold" }}>Year: </Text>
    <Text>{UserInfo[0].year}</Text>
  </View>
  <View style={styles.textField}>
    <Text style={{ fontWeight: "bold" }}>Roll No: </Text>
    <Text>{UserInfo[0].roll_no}</Text>
  </View>
  <View style={styles.rowbtns}>
    <Button
      style={[
        styles.btnstyle,
        {
          margin: 10,
          backgroundColor: "#4CAF50"
        }
      ]}
      mode="contained"
      onPress={() => this.NavigateToQueue()}
    >
      Next
    </Button>
    <Button
      style={[
        styles.btnstyle,
        {
          backgroundColor: "red"
        }
      ]}
      mode="contained"
      onPress={() => this.signOutUser(currentUser)}
    >
      Signout
    </Button>
  </View>
</View> */}

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
