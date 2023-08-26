import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { useNavigation } from "@react-navigation/native";

type Props = {
  messageChatDetails: {
    id: string;
    itemID: string;
    itemPhotoURL: string;
    brand: string;
    title: string;
    type: string;
    lastMessage: string;
    lastMessageTime: Date;
    otherUserID: string;
  };
};

const MessagesRow = ({ messageChatDetails }: Props) => {
  const navigation = useNavigation<any>();

  const {
    id,
    itemID,
    itemPhotoURL,
    brand,
    title,
    type,
    lastMessage,
    lastMessageTime,
    otherUserID,
  } = messageChatDetails;

  const [lastMessageTimeStr, setLastMessageTimeStr] = useState<string>("");

  useEffect(() => {
    const todayDate = new Date();
    if (lastMessageTime.getDate() === todayDate.getDate())
      // Current day
      setLastMessageTimeStr(
        lastMessageTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    else if (
      new Date(new Date().setDate(todayDate.getDate() - 7)) < lastMessageTime
    )
      // Last  seven days
      setLastMessageTimeStr(
        lastMessageTime
          .toLocaleString("en-US", { weekday: "short" })
          .split(",")[0]
      );
    else if (lastMessageTime.getFullYear() === todayDate.getFullYear())
      // Current year
      setLastMessageTimeStr(
        lastMessageTime.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
    else
      setLastMessageTimeStr(
        lastMessageTime.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
  }, [lastMessageTime]);

  const handleOnPress = () => {
    navigation.navigate("MessageChat", {
      brand,
      title,
      isNew: false,
      otherUserID,
      itemID,
      chatID: id,
      itemPhotoURL,
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <Image source={{ uri: itemPhotoURL }} style={styles.image} />
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <View style={styles.firstRowText}>
          <Text style={[fonts.h6, styles.title]}>{`${brand} - ${title}`}</Text>
          <Text
            style={[
              fonts.p,
              styles.transactionType,
              {
                backgroundColor:
                  type === "trade" ? "blue" : type === "sell" ? "red" : "green",
              },
            ]}
          >
            {type}
          </Text>
        </View>
        <View style={styles.lastMessageCont}>
          <Text
            numberOfLines={1}
            style={[fonts.p, styles.lastMessage, styles.lastMessageText]}
          >
            {lastMessage}
          </Text>
          <Text
            style={[fonts.p, styles.lastMessage]}
          >{` • ${lastMessageTimeStr}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessagesRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  firstRowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "500" },
  transactionType: {
    color: "white",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  lastMessageCont: { flexDirection: "row" },
  lastMessage: { color: colors.lightBlack },
  lastMessageText: { flex: 1 },
});
