import React from "react";
import { StyleSheet, View, Image, Dimensions, PixelRatio } from "react-native";
import { Button, Headline } from "react-native-paper";

//
const LoginBackgroundImage = require("../src/LoginBG.jpg");

export default class LoginBackground extends React.Component {
  // widthPercentageToDP = widthPercent => {
  //   const screenWidth = Dimensions.get("window").width;
  //   // Convert string input to decimal number
  //   const elemWidth = parseFloat(widthPercent);
  //   return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  // };
  // heightPercentageToDP = heightPercent => {
  //   const screenHeight = Dimensions.get("window").height;
  //   // Convert string input to decimal number
  //   const elemHeight = parseFloat(heightPercent);
  //   return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  // };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={styles.btnstyle}
          >
            Create Organizer Account
          </Button>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.btnstyle}
          >
            I Have an Account
          </Button>
        </View>
      </View>
    );
  }
}

{/* <View style={styles.container}>
  <View style={styles.queueimg}>
    <Image
      style={{
        justifyContent: "center"
      }}
      resizeMode="center"
      source={LoginBackgroundImage}
    />
  </View>
  <View style={styles.bottom}>
    <Button
      style={[styles.btnstyle, { marginTop: 10 }]}
      mode="contained"
      onPress={() => this.props.navigation.navigate("SignUp")}
    >
      Create Organizer Account
    </Button>
    <Button
      style={[
        styles.btnstyle,
        {
          margin: 10,
          backgroundColor: "#4CAF50"
        }
      ]}
      mode="contained"
      onPress={() => this.props.navigation.navigate("Login")}
    >
      I Have an Account
    </Button>
  </View>
</View> */}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headline: {
    height: "15%",
    alignItems: "center"
  },
  headlinetxt: {
    paddingTop: "10%",
    textAlign: "center",
    fontWeight: "bold",
    width: "100%"
  },
  queueimg: {
    height: "65%",
    justifyContent: "center",
    alignItems: "center"
  },
  bottom: {
    marginTop: 10,
    height: "20%",
    flexDirection: "row"
  },
  btnstyle: {
    marginBottom: "5%"
  }
});
