import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Search from "./Search";
import ItemsGallery from "./ItemsGallery";
import { data } from "../../utils/data";

type Props = {};

const DiscoverScreen = (props: Props) => {
  return (
    <SafeAreaView>
      <Search />
      <ItemsGallery items={data} />
    </SafeAreaView>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({});
