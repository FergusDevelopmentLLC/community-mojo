import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import firebase from "react-native-firebase";

export default class JoinAQueue extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      assignment: "",
      experiments: ""
    }),
      (this.ref = firebase.firestore().collection("User_Queue"));
  }

  getTimeScore() {
    date = new Date();
    let day = date.getDay();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const TimeStamp = 31 - day + hours + min / 60 + sec / 3600;
    this.calculatePriority(TimeStamp);
  }

  calculatePriority(TimeStamp) {
    QueueTime = this.props.navigation.state.params.currentData.TimeScore;
    QueueTime = parseFloat(QueueTime);
    // alert(QueueTime);
    TimeDifference = (TimeStamp - QueueTime).toPrecision(6) * 10;
  }

  addData() {
    this.setState({
      Department: this.state.Department,
      Subject: this.state.Subject
    });

    this.ref.add({
      active: false,
      additional_instructions: this.state.AddInt,
      department: this.state.Department
    });
  }

  render() {
    const IndexPage = <Text>Come with Index Page</Text>;
    console.log(this.props.navigation.state.params.currentData);
    return (
      <View style={styles.container}>
        <Text>Join a Queue!</Text>
        <Text> Subject Details </Text>
        <Text>
          Additional Instructions:
          {
            this.props.navigation.state.params.currentData
              .additional_instructions
          }
        </Text>
        <Text>
          Department:
          {this.props.navigation.state.params.currentData.department}
        </Text>
        <Text>
          Year:
          {this.props.navigation.state.params.currentData.year}
        </Text>
        <View>
          {this.props.navigation.state.params.currentData.year && IndexPage}
        </View>

        <TextInput
          style={{ height: 40 }}
          placeholder="Experiments Pending"
          onChangeText={experiments => this.setState({ experiments })}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Assignments Pending"
          onChangeText={assignment => this.setState({ assignment })}
        />
        <Button
          onPress={() => this.getTimeScore()}
          title="Join"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },

  countText: {
    color: "white",

    textAlign: "center"
  }
});
