import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../../components/atoms/CustomText";
import { colors } from "../../utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { fonts } from "../../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../context/GlobalContext";

type Props = {
  price: number;
  brand: string;
  title: string;
  itemID: string;
  sellerID: string;
  itemPhotoURL: string;
};

const ActionBar = ({
  price,
  brand,
  title,
  itemID,
  sellerID,
  itemPhotoURL,
}: Props) => {
  const navigation = useNavigation<any>();
  const { messageChats } = useGlobalContext();

  const handlePressChat = () => {
    let chatID;
    const isNew = !messageChats.some((messageChat) => {
      if (messageChat.itemID === itemID) {
        chatID = messageChat.id;
        return true;
      }
      return false;
    });
    navigation.navigate("MessageChat", {
      brand,
      title,
      isNew,
      otherUserID: sellerID,
      itemID,
      chatID,
      itemPhotoURL,
    });
  };

  return (
    <View style={styles.container}>
      <CustomText style={[fonts.h1, styles.price]}>${price}</CustomText>
      <View style={styles.buttonCont}>
        <TouchableOpacity
          style={[styles.button, styles.iconButton]}
          onPress={handlePressChat}
        >
          <FontAwesome5
            solid
            name="comment"
            size={20}
            color="#FFF"
            style={styles.buttonText}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <CustomText style={styles.buttonText}>Make offer</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
          <CustomText style={styles.buttonText}>Buy now</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  price: { flexBasis: 80, flexShrink: 1 },
  buttonCont: {
    flexBasis: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 5,
  },
  button: {
    width: "32%",
    paddingVertical: 10,
    backgroundColor: "#000",
    color: "#FFF",
    borderRadius: 5,
    marginLeft: 10,
  },
  iconButton: { width: "15%" },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonText: { color: "#FFF", textAlign: "center" },
});
