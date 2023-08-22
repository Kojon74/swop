import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomHeader from "../../components/atoms/CustomHeader";

type NavParams = {
  chatID: string | undefined;
  isNew: boolean;
  title: string;
  sellerID: string;
  itemID: string;
};

const MessageChatScreen = () => {
  const route = useRoute();
  const { chatID, title, sellerID, itemID } = route.params as NavParams;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [curChatID, setCurChatID] = useState<string>(chatID ? chatID : "");

  // Get all text messages
  useEffect(() => {
    if (!!chatID)
      (async () =>
        setMessages(
          (
            await getDocs(
              query(
                collection(db, `messages/${chatID}/chat`),
                orderBy("createdAt", "desc"),
                limit(50)
              )
            )
          ).docs.map(
            (doc) =>
              ({
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
              } as IMessage)
          )
        ))();
  }, [chatID]);

  const onSend = useCallback(
    async (messages: IMessage[] = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const { _id, createdAt, text, user } = messages[0];
      let newChatID = curChatID;

      if (!!!curChatID) {
        const newChatDocRef = await addDoc(collection(db, "messages"), {
          title,
          itemID,
          buyer: [auth.currentUser?.uid],
          seller: [sellerID],
        });
        setCurChatID(newChatDocRef.id);
        newChatID = newChatDocRef.id;
      }

      addDoc(collection(doc(collection(db, "messages"), newChatID), "chat"), {
        _id,
        createdAt,
        text,
        user,
      });
    },
    [curChatID]
  );

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <CustomHeader text={title} />
      <GiftedChat
        minComposerHeight={36}
        maxComposerHeight={100}
        keyboardShouldPersistTaps="never"
        bottomOffset={35}
        alwaysShowSend
        messages={messages}
        user={{
          _id: auth.currentUser?.displayName,
        }}
        textInputStyle={[fonts.p, styles.textInput]}
        placeholder="Message..."
        onSend={(messages) => onSend(messages)}
        renderAvatar={null}
        renderInputToolbar={(props) => (
          <InputToolbar {...props} containerStyle={styles.inputToolbar} />
        )}
        renderSend={(props) => (
          <Send {...props}>
            <View style={styles.sendIcon}>
              <FontAwesome5 name="arrow-up" size={20} color="white" />
            </View>
          </Send>
        )}
      />
    </SafeAreaView>
  );
};

export default MessageChatScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
  inputToolbar: {
    height: "auto", // Important
    marginTop: 0,
    borderTopWidth: 0,
  },
  sendIcon: {
    // alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: colors.primary,
    marginVertical: 3,
  },
});
