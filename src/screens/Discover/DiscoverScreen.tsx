import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import ItemsGallery from "./ItemsGallery";
import {
  collection,
  documentId,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useGlobalContext } from "../../context/GlobalContext";
import { db } from "../../utils/firebase";

type Props = {};

const DiscoverScreen = (props: Props) => {
  const { userListedItems }: { userListedItems: string[] | undefined } =
    useGlobalContext();
  const [discoverItems, setDiscoverItems] = useState<string[]>([]);

  // Get all items that weren't listed by the current user
  useEffect(() => {
    (async () => {
      if (!!userListedItems) {
        // Fixes: Invalid Query. A non-empty array is required for 'not-in' filters.
        const discoverQuery =
          userListedItems.length !== 0
            ? query(
                collection(db, "items"),
                where(documentId(), "not-in", userListedItems),
                limit(10)
              )
            : query(collection(db, "items"), limit(10));
        // Don't sort items here since we still need to query data later which will jumble ordering
        setDiscoverItems(
          (await getDocs(discoverQuery)).docs.map((doc) => doc.id)
        );
      }
    })();
  }, [userListedItems]);

  return (
    <SafeAreaView>
      <Search />
      <ItemsGallery items={discoverItems} />
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({});
