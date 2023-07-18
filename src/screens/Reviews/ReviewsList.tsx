import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = { data: any };

const ReviewsList = ({ data }: Props) => {
  return <FlatList renderItem={({ item }) => <View></View>} data={data} />;
};

export default ReviewsList;

const styles = StyleSheet.create({});
