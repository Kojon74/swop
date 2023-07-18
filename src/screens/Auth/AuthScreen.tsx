import React from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AuthProviders from "./AuthProviders";
import AuthTerms from "./AuthTerms";
import { colors } from "react-native-elements";

const iconPath = "../../../assets/icon.png";

const AuthScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.imgCont}>
          <Image source={require(iconPath)} style={styles.img} />
        </SafeAreaView>
        <SafeAreaView style={styles.bottomContOuter}>
          <View style={styles.bottomCont}>
            <View style={styles.headerCont}>
              <Text style={styles.header}>Get started with Clearo!</Text>
              <Text style={styles.subHeader}>
                Your companion in learning more about your skin
              </Text>
            </View>
            <AuthProviders />
            <AuthTerms />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imgCont: { flex: 1 },
  img: { height: "100%", width: "100%", resizeMode: "contain" },
  bottomContOuter: {
    flex: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // backgroundColor: colors.background,
  },
  bottomCont: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerCont: { marginVertical: 10 },
  header: {
    fontSize: 23,
    fontWeight: "600",
    // marginVertical: 15,
    color: "#444444",
  },
  subHeader: { marginTop: 10, fontSize: 19, color: "#888888" },
  forgotPassBtn: { alignSelf: "flex-end" },
  forgotPass: { color: colors.primary, marginBottom: 10 },
  error: {
    color: "red",
    marginLeft: 10,
    fontSize: 15,
  },
});
