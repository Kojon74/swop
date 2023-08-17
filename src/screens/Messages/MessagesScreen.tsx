import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import MessagesRow from "./MessagesRow";
import Search from "../Discover/Search";

type Props = {};

const MessagesScreen = (props: Props) => {
  const { messageChats } = useGlobalContext();
  console.log(messageChats);

  return (
    <SafeAreaView>
      <Search />
      <FlatList
        data={messageChats}
        renderItem={({ item }) => <MessagesRow messageChatDetails={item} />}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
