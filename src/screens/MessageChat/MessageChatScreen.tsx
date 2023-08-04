import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import { addDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomHeader from "../../components/atoms/CustomHeader";

const MessageChatScreen = () => {
  const route = useRoute();
  const { chatID, isNew, title } = route.params;

  console.log(auth.currentUser);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    let newChatID = chatID;
    console.log(isNew);

    if (isNew) {
      const newChatDocRef = await addDoc(collection(db, "messages"), {
        title,
        buyer: auth.currentUser?.uid,
        seller: "sellerID", // TODO
      });
      newChatID = newChatDocRef.id;
    }
    addDoc(collection(doc(collection(db, "messages"), newChatID), "chat"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

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
