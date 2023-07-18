import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import GalleryItem from "./GalleryItem";
import { SIZES } from "../../utils/constants";

type Props = {
  items: {
    title: string;
    brand: string;
    desc: string;
    price: number;
    size: SIZES;
    color: string;
    images: string[];
    sellerID: string;
    datePosted: Date;
  }[];
};

const ItemsGallery = ({ items }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }) => <GalleryItem item={item} />}
        data={items}
        numColumns={2}
      />
    </View>
  );
};

export default ItemsGallery;

const styles = StyleSheet.create({
  container: {},
});
