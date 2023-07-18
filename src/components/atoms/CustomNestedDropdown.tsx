import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { fonts } from "../../utils/fonts";
import { colors } from "../../utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = { data: object };

const CustomNestedDropdown = ({ data }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowDropdown((prev) => !prev)}
        style={styles.buttonContainer}
      >
        <Text
          style={[
            fonts.p,
            styles.text,
            isPlaceholder && { color: colors.lightBlack },
          ]}
        >
          Category
        </Text>
        <FontAwesome5
          name={showDropdown ? "caret-up" : "caret-down"}
          solid
          size={20}
          color={colors.lightBlack}
        />
      </TouchableOpacity>
      {Object.keys(data)}
      <FlatList
        data={Object.keys(data)}
        renderItem={({ item }) => CustomDropdownItem(item)}
        style={[styles.flatlist, !showDropdown && styles.hide]}
      />
      <View style={{ height: 300 }} />
    </View>
  );
};

const CustomDropdownItem = (item: any) => (
  <TouchableOpacity style={styles.dropdownItemContainer}>
    <Text style={[fonts.p]}>{item}</Text>
    <FontAwesome5 name={"caret-right"} solid size={20} />
  </TouchableOpacity>
);

export default CustomNestedDropdown;

const styles = StyleSheet.create({
  container: { position: "relative" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  flatlist: {
    position: "absolute",
    top: 54,
    width: "100%",
  },
  hide: { display: "none" },
  dropdownItemContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    marginVertical: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
