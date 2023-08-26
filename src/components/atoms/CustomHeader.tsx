import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "./BackButton";

type Props = {
  text: string;
  subHeader?: string;
  photoURL?: string;
  nav?: () => void;
  backDisabled?: boolean;
  icon?: JSX.Element;
};

const CustomHeader = ({
  text,
  subHeader,
  photoURL,
  icon,
  backDisabled = false,
  nav,
}: Props) => {
  return (
    <View style={styles.header}>
      {backDisabled ? (
        <View style={styles.emptyBackBtn} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BackButton nav={nav} />
          {photoURL && (
            <Image
              source={{ uri: photoURL }}
              style={{
                height: 35,
                width: 35,
                marginRight: 10,
                borderRadius: 5,
              }}
            />
          )}
        </View>
      )}
      <View style={styles.textCont}>
        <Text style={styles.headerTxt}>{text}</Text>
        {subHeader && <Text style={styles.subHeaderTxt}>{subHeader}</Text>}
      </View>
      {icon && icon}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyBackBtn: {
    paddingLeft: 10,
    height: 35,
  },
  textCont: { flex: 1 },
  headerTxt: { fontSize: 30, fontWeight: "600" },
  subHeaderTxt: { fontSize: 16, color: "#888888" },
});
