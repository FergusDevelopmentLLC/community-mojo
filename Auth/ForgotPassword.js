import React from "react";
import { StyleSheet, View } from "react-native";
import firebase from "react-native-firebase";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
    errorMessage: null,
    loading: false,
    toast: false
  };
  onSubmit = () => {
    this.setState({ loading: true });
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((res) => {
        this.setState(
          { errorMessage: "Check your email for password reset link." },
          this.setState({ loading: false, toast: true })
        )
        console.log("**** toast?")
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
        <View style={{ marginTop: "40%" }}>
          <Text style={styles.title}>Forgot Password</Text>
        </View>
        <View style={styles.textinput}>
          <TextInput
            mode="outlined"
            autoCapitalize="none"
            label="Email"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={{ height: "50%" }}>
          <View style={styles.loginbtns}>
            <Button
              disabled={!this.state.email.includes("@")}
              mode="contained"
              loading={this.state.loading}
              onPress={this.onSubmit}
            >
              Recover Password
            </Button>
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("Login")}
            >
            Log in
            </Button>
          </View>
          <View style={{ elevation: 3 }}>
            <Snackbar
              visible={this.state.toast}
              onDismiss={() => this.setState({ toast: false })}
              duration={Snackbar.DURATION_SHORT}
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
    color: "#3700B3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  loginbtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
