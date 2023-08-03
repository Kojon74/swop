import { StyleSheet, SafeAreaView, Dimensions, Text, View } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../../utils/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "./Carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { fonts } from "../../utils/fonts";
import CustomText from "../../components/atoms/CustomText";
import ActionBar from "./ActionBar";

const WINDOW_WIDTH = Dimensions.get("window").width;
type itemType = {
  title: string;
  brand: string;
  desc: string;
  price: number;
  size: SIZES;
  color: string;
  images: string[];
};

const ItemDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { title, brand, desc, price, size, color, images } =
    route.params as itemType;

  const [liked, setLiked] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <FontAwesome5 name="times" size={20} />
      </TouchableOpacity>
      <Carousel data={images} liked={liked} setLiked={setLiked} />
      <View style={styles.descCont}>
        <CustomText style={fonts.h1}>{title}</CustomText>
        <CustomText>Size: {size}</CustomText>
        <CustomText>{desc}</CustomText>
        <CustomText>Seller</CustomText>
        <CustomText></CustomText>
      </View>
      <ActionBar price={price} title={title} />
    </SafeAreaView>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { padding: 10 },
  descCont: { padding: 10 },
});
