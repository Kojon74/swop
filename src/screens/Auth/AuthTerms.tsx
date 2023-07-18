import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../utils/fonts";
import { colors } from "../../utils/colors";

const AuthTerms = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.terms}>
      <Text style={[fonts.p, styles.termsText]}>
        By joining you agree to our{" "}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
        <Text style={[fonts.p, styles.termsText, { color: colors.primary }]}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthTerms;

const styles = StyleSheet.create({
  terms: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginTop: "auto",
  },
  termsText: { fontSize: 15 },
});
