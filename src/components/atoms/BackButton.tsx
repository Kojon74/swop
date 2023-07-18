import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  backDisabled?: boolean;
  nav?: any;
}

const BackButton = ({ backDisabled = false, nav }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      disabled={backDisabled}
      onPress={nav ? nav : navigation.goBack}
      style={styles.container}
    >
      <View style={styles.backButton}>
        <FontAwesome5 name="chevron-left" size={17} color="#666666" />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: { padding: 10 },
  backButton: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#cccccc",
  },
});
