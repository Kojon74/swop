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
import { ItemType } from "../Discover/ItemsGallery";

const WINDOW_WIDTH = Dimensions.get("window").width;

const ItemDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const {
    brand,
    category,
    color,
    datePosted,
    desc,
    imagePaths,
    imageURIs,
    price,
    sellerID,
    sellerUsername,
    size,
    title,
    id,
  } = route.params as ItemType;

  const [liked, setLiked] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <FontAwesome5 name="times" size={20} />
      </TouchableOpacity>
      <Carousel data={imageURIs} liked={liked} setLiked={setLiked} />
      <View style={styles.descCont}>
        <CustomText style={fonts.h1}>{`${brand} - ${title}`}</CustomText>
        <CustomText>Size: {size}</CustomText>
        <CustomText>@{sellerUsername}</CustomText>
        <CustomText>{desc}</CustomText>
      </View>
      <ActionBar
        price={price}
        brand={brand}
        title={title}
        itemID={id}
        sellerID={sellerID}
        itemPhotoURL={imageURIs[0]}
      />
    </SafeAreaView>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { padding: 10 },
  descCont: { padding: 10 },
});
