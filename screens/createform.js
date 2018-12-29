import React, { Component } from "react";
import { StyleSheet, Text, View, CheckBox, Picker } from "react-native";
import moment from "moment";
import firebase from "react-native-firebase";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "react-native-modal-datetime-picker";
// This is Create Form Page!

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Department: "",
      Year: "",
      Subject: "",
      indexPage: false,
      COEP: false,
      AddInt: "",
      startTime: "Select Submission Start Date & Time",
      currentUser: "",
      isDateTimePickerVisible: false
    };
    this.ref = firebase.firestore().collection("Queue");
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ startTime: moment(date).format("Do MMMM, YYYY HH:mm") });
    this._hideDateTimePicker();
    console.log(this.state.startTime);
  };

  getTimeScore() {
    date = new Date();
    let day = date.getDay();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const TimeStamp = (31 - day + hours + min / 60 + sec / 3600).toPrecision(6);
    this.addData(TimeStamp);
  }

  addData(TimeStamp) {
    this.setState({
      Department: this.state.Department,
      Subject: this.state.Subject,
      Year: this.state.Year,
      IndexPage: this.state.indexPage,
      COEP: this.state.COEP
    });
    this.ref.add({
      active: false,
      additional_instructions: this.state.AddInt,
      department: this.state.Department,
      subject: this.state.Subject,
      year: this.state.Year,
      indexPage: this.state.indexPage,
      coep: this.state.COEP,
      CreatedBy: this.state.currentUser.email,
      TimeScore: TimeStamp,
      Queue_size: 0,
      startTime: this.state.startTime
    });
    alert("Queue Has been Created!");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Picker
            selectedValue={this.state.Department}
            onValueChange={Department => this.setState({ Department })}
          >
            <Picker.Item label="Select Department" value="" />
            <Picker.Item label="Computer" value="Computer" />
            <Picker.Item label="I.T." value="IT" />
            <Picker.Item label="EXTC" value="EXTC" />
            <Picker.Item label="ETRX" value="ETRX" />
          </Picker>
          <Picker
            selectedValue={this.state.Year}
            onValueChange={Year => this.setState({ Year })}
          >
            <Picker.Item label="Select Year" value="" />
            <Picker.Item label="S.E." value="S.E." />
            <Picker.Item label="T.E." value="T.E." />
            <Picker.Item label="B.E." value="B.E." />
          </Picker>
          <TextInput
            mode="outlined"
            autoCapitalize="characters"
            label="Subject"
            onChangeText={Subject => this.setState({ Subject })}
            value={this.state.Subject}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "70%" }}>
              <Text style={{ marginTop: 5 }}> Index Page</Text>
            </View>
            <View style={{ width: "30%" }}>
              <CheckBox
                value={this.state.indexPage}
                onValueChange={() =>
                  this.setState({ indexPage: !this.state.indexPage })
                }
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "70%" }}>
              <Text style={{ marginTop: 5 }}> Course Exit and Outcome</Text>
            </View>
            <View style={{ width: "30%" }}>
              <CheckBox
                value={this.state.COEP}
                onValueChange={() => this.setState({ COEP: !this.state.COEP })}
              />
            </View>
          </View>
          <TextInput
            label="Additional Intrustions!"
            mode="outlined"
            onChangeText={AddInt => this.setState({ AddInt })}
            value={this.state.AddInt}
          />
          <Button onPress={this._showDateTimePicker}>
            <Text>{this.state.startTime}</Text>
          </Button>
          <DateTimePicker
            mode="datetime"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            disabled={
              this.state.department === "" ||
              this.state.year === "" ||
              this.state.subject === "" ||
              this.state.startTime === "Select Submission Start Date & Time"
            }
            mode="contained"
            onPress={() => this.getTimeScore()}
          >
            Create a Queue!
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  formContainer: {
    justifyContent: "space-between",
    margin: 20
  },
  btnContainer: {
    alignItems: "center"
  }
});
