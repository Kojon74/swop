import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { useGlobalContext } from "../../context/GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

type Props = {};

const SettingsScreen = (props: Props) => {
  const { clearState, setIsAuthenticated, unsubMessages } = useGlobalContext();

  const handleSignOut = async () => {
    unsubMessages();
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      clearState();
    } catch (error) {
      console.error(error);
    }
  };

  const settingsItems = [
    {
      title: "Sign out",
      icon: "sign-out-alt",
      onPress: handleSignOut,
      destructive: true,
    },
    {
      title: "Delete account",
      icon: "trash",
      onPress: () => {},
      destructive: true,
    },
  ];

  return (
    <SafeAreaView>
      <FlatList
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress} style={styles.settingsItem}>
            <FontAwesome5
              name={item.icon}
              size={20}
              style={[styles.icon, item.destructive && styles.destructive]}
            />
            <Text style={[fonts.p, item.destructive && styles.destructive]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        data={settingsItems}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsItem: { flexDirection: "row", alignItems: "center" },
  icon: { width: 30, textAlign: "center" },
  destructive: { color: colors.red },
});
