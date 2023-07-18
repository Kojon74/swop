import { StyleSheet, View } from "react-native";
import React from "react";
import AuthProvider from "./AuthProvider";
import useAuth from "./useAuth";

const AuthProviders = () => {
  const {
    navigation,
    // isAppleAvailable,
    // request,
    // loginWithApple,
    // loginWithGoogle,
  } = useAuth();

  return (
    <View style={styles.container}>
      {/* <AuthProvider
        disabled={!isAppleAvailable}
        name="Apple"
        onPress={() => loginWithApple(false)}
      />
      <AuthProvider
        disabled={!request}
        name="Google"
        onPress={() => loginWithGoogle(false)}
      /> */}
      <AuthProvider
        disabled={false}
        name="Email"
        onPress={() => navigation.navigate("AuthEmail")}
      />
    </View>
  );
};

export default AuthProviders;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
