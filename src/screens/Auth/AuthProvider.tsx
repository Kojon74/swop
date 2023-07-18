import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

type Props = {
  name: string;
  disabled: boolean;
  onPress: () => void;
};

const AuthProvider = ({ name, disabled = true, onPress = () => {} }: Props) => {
  const [logo, setLogo] = useState<any>();
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (name === "Apple") {
      setLogo(
        <FontAwesome5
          name={"apple"}
          solid
          size={20}
          color="white"
          style={[styles.logo, { marginLeft: 3 }]}
        />
      );
      setBackgroundColor("#000000");
    } else if (name === "Google") {
      setLogo(
        <Image
          source={require("../../../assets/google-icon.png")}
          style={[styles.logo, styles.imageLogo]}
        />
      );
      setBackgroundColor("#DDDDDD");
    } else {
      setLogo(
        <FontAwesome5
          name={"envelope"}
          solid
          size={20}
          color="white"
          style={[styles.logo]}
        />
      );
      setBackgroundColor(colors.primary);
    }
  }, []);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.logoCont}>{logo}</View>
      <Text
        style={[
          styles.text,
          { color: name === "Google" ? "#000000" : "#FFFFFF" },
        ]}
      >
        Continue with {name}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  googleCont: { backgroundColor: "#DDDDDD" },
  appleCont: { backgroundColor: "#000000" },
  logoCont: { flex: 1, alignItems: "center", marginHorizontal: 5 },
  logo: {
    height: 20,
    width: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  imageLogo: { resizeMode: "contain" },
  text: { fontSize: 19, fontWeight: "400", flex: 6 },
});
