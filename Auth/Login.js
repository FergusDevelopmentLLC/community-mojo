import React from "react";
import { StyleSheet, View } from "react-native";
import firebase from "react-native-firebase";
import { Text, TextInput, Button, Snackbar } from "react-native-paper";
import { Icon } from "native-base";

export default class Login extends React.Component {
  
  static navigationOptions = {
    headerMode: 'none',
    header: null
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
    loading: false,
    toast: false
  };

  
  handleLogin = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("NavOrganizer"))
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
          <Text style={styles.title}>Log In</Text>
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

          <TextInput
            mode="outlined"
            secureTextEntry
            autoCapitalize="none"
            label="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <View>
          <View style={styles.loginbtns}>
            <Button
              disabled={
                !this.state.email.includes("@") ||
                this.state.password.length === 0
              }
              mode="contained"
              loading={this.state.loading}
              onPress={this.handleLogin}
            >
              Login
            </Button>
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            >
            Forgot password?
            </Button>
          </View>
          <View style={{ elevation: 3 }}>
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
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#3700B3",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
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
  loginbtns: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});