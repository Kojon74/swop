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
  brand: string;
  category: string;
  color: string;
  datePosted: Date;
  desc: string;
  imagePaths: string[];
  imageURIs: string[];
  price: number;
  sellerID: string;
  sellerUsername: string;
  size: SIZES;
  title: string;
  id: string;
};

type Props = {
  items: string[] | undefined;
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
          ).docs
            .sort(
              (a, b) =>
                b.data().datePosted.toDate() - a.data().datePosted.toDate()
            )
            .map((doc) => ({ ...doc.data(), id: doc.id } as ItemType))
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

export { ItemType };

export default ItemsGallery;

const styles = StyleSheet.create({
  container: {},
});
