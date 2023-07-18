import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/atoms/CustomHeader";
import CategoriesList from "../SellItem/CategoriesList";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {};

const SelectCategoryScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setCategory } = route.params;
  const [data, setData] = useState(CategoriesList);

  const handleSelectRow = (item: any) => {
    console.log(data[item]);

    if (data[item] !== "") setData((prev) => prev[item]);
    else {
      setCategory(item);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
      <CustomHeader text="Select Category" />
      <FlatList
        data={Object.keys(data)}
        renderItem={({ item }) => CategoryRow(data, item, handleSelectRow)}
      />
    </SafeAreaView>
  );
};

const CategoryRow = (data: any, item: any, handleSelectRow: any) => {
  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => handleSelectRow(item)}
    >
      <Text style={[fonts.p]}>{item}</Text>
      {data[item] !== "" && (
        <FontAwesome5 name={"caret-right"} solid size={20} />
      )}
    </TouchableOpacity>
  );
};

export default SelectCategoryScreen;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
