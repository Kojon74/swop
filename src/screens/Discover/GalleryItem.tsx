import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SIZES } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

type Props = {
  item: {
    title: string;
    brand: string;
    desc: string;
    price: number;
    size: SIZES;
    color: string;
    images: string[];
    sellerID: string;
    datePosted: Date;
  };
};

const WINDOW_WIDTH = Dimensions.get("window").width;

const GalleryItem = ({ item }: Props) => {
  const navigation = useNavigation<any>();
  const {
    title,
    brand,
    desc,
    price,
    size,
    color,
    images,
    sellerID,
    datePosted,
  } = item;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemDetails", { ...item })}
      style={styles.container}
    >
      <Image source={{ uri: images[0] }} style={styles.image} />
      <View style={styles.desc}>
        <View style={styles.firstRowDesc}>
          <Text>${price}</Text>
          <Text>{size}</Text>
        </View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GalleryItem;

const styles = StyleSheet.create({
  container: { maxWidth: Math.floor(WINDOW_WIDTH / 2) },
  image: {
    width: Math.floor(WINDOW_WIDTH / 2),
    height: Math.floor(WINDOW_WIDTH / 2),
  },
  desc: { padding: 5 },
  firstRowDesc: { flexDirection: "row", justifyContent: "space-between" },
});
