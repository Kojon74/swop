import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = { messageChatDetails: { id: string } };

const MessagesRow = ({ messageChatDetails }: Props) => {
  return (
    <View>
      <Text>{messageChatDetails.id}</Text>
    </View>
  );
};

export default MessagesRow;

const styles = StyleSheet.create({});
