import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import CustomHeader from "../../components/atoms/CustomHeader";
import { fonts } from "../../utils/fonts";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {};

type RouteParamTypes = {
  list: any;
  setItem: (e: string | React.ChangeEvent<any>) => void;
};

const SelectScreen = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { list, setItem } = route.params as RouteParamTypes;
  const [data, setData] = useState<any>(list);

  const handleSelectRow = (item: any) => {
    if (data[item] !== "") setData((prev: any) => prev[item]);
    else {
      setItem(item);
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

export default SelectScreen;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
