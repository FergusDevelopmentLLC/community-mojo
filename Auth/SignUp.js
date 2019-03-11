import React from "react";
import { StyleSheet, View } from "react-native";
import firebase from "react-native-firebase";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";
import { Icon } from "native-base";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    city: "",
    state: "",
    first_name: "",
    last_name: "",
    errorMessage: null,
    loading: false,
    toast: false
  };

  handleSignup = () => {
    this.setState({ loading: true });
    const { email, password, city, state } = this.state;
    console.log("**** 9" + "here");
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        const account = {
          useruid: res.user.uid,
          email: this.state.email, 
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          city: this.state.city,
          state: this.state.state
        }
        firebase.firestore().collection("users").doc(res.user.uid).set(account);
      })
      .catch(error =>
        this.setState(
          { errorMessage: error.message },
          this.setState({ loading: false, toast: true })
        )
      );
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create organizer account</Text>
        </View>
        <View style={styles.textinput}>
          
          <TextInput 
            mode="outlined"
            autoCapitalize="none"
            label="First name"
            onChangeText={first_name => this.setState({ first_name })}
            value={this.state.first_name}
          />

          <TextInput 
            mode="outlined"
            autoCapitalize="none"
            label="Last name"
            onChangeText={last_name => this.setState({ last_name })}
            value={this.state.last_name}
          />

          <TextInput 
            mode="outlined"
            autoCapitalize="none"
            label="Email"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            mode="outlined"
            secureTextEntry
            autoCapitalize="none"
            label="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            mode="outlined"
            autoCapitalize="words"
            label="Home city"
            onChangeText={city => this.setState({ city })}
            value={this.state.city}
          />
          <TextInput
            mode="outlined"
            autoCapitalize="words"
            label="State"
            onChangeText={state => this.setState({ state })}
            value={this.state.state}
          />
        </View>
        <View>
          <View style={styles.loginbtns}>
            <Button
              disabled={
                !this.state.email.includes("@") ||
                this.state.password.length === 0 ||
                this.state.city.length === 0 ||
                this.state.state.length === 0
              }
              mode="contained"
              loading={this.state.loading}
              onPress={this.handleSignup}
            >
              Sign Up
            </Button>
          </View>
          <View>
            <Snackbar
              visible={this.state.toast}
              onDismiss={() => this.setState({ toast: false })}
            >
              {this.state.errorMessage}
            </Snackbar>
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
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  textinput: {
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: "flex-end"
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#337ab7",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  btnstyle: {
    height: 50,
    width: 150,
    justifyContent: "center"
  },
  loginbtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
