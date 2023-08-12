import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";
import { SIZES } from "../../utils/constants";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

type ItemType = {
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

type Props = {
  items: string[];
};

const ItemsGallery = ({ items }: Props) => {
  const [itemsData, setItemsData] = useState<ItemType[]>([]);

  // Get item data from itemID strings
  useEffect(() => {
    (async () => {
      // Fixes: Invalid Query. A non-empty array is required for 'in' filters.
      items &&
        items.length !== 0 &&
        setItemsData(
          (
            await getDocs(
              query(collection(db, "items"), where(documentId(), "in", items))
            )
          ).docs.map((doc) => doc.data() as ItemType)
        );
    })();
  }, [items]);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }) => <GalleryItem item={item} />}
        data={itemsData}
        numColumns={2}
      />
    </View>
  );
};

export default ItemsGallery;

const styles = StyleSheet.create({
  container: {},
});
