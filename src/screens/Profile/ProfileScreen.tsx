import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import ItemsGallery from "../Discover/ItemsGallery";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/atoms/CustomButton";
import { fonts } from "../../utils/fonts";
import { useGlobalContext } from "../../context/GlobalContext";
import { auth } from "../../utils/firebase";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { userListedItems } = useGlobalContext();

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={styles.settingsButton}
      >
        <FontAwesome5 solid name="cog" size={24} />
      </TouchableOpacity>
      <Text style={[fonts.h1, styles.username]}>
        @{auth.currentUser?.displayName}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Reviews")}
        style={styles.starsCont}
      >
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FontAwesome5 solid name="star" size={20} key={i} />
          ))}
      </TouchableOpacity>
      <CustomButton
        text="Add new listing"
        style={styles.addListingButton}
        onPress={() => navigation.navigate("SellItem")}
      />
      <ItemsGallery items={userListedItems} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  settingsButton: { alignSelf: "flex-end", padding: 10 },
  username: { alignSelf: "center" },
  starsCont: { flexDirection: "row", justifyContent: "center" },
  addListingButton: { marginTop: 20, margin: 10 },
});
