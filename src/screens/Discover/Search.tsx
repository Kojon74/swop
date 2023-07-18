import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

type Props = {};

const Search = (props: Props) => {
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchList, setSearchList] = useState<{ title: string }[]>([
    { title: "HELLO" },
  ]);

  return (
    <View>
      <SearchBar
        platform="ios"
        placeholder="Search"
        onChangeText={
          setSearchQuery as ((text: string) => void) &
            ((text: string) => void) &
            (() => any) &
            (() => any) &
            (() => any)
        }
        onBlur={() => setSearchFocused(false)}
        onFocus={() => setSearchFocused(true)}
        value={searchQuery}
      />
      <View>
        <FlatList
          renderItem={({ item }) => <Text>{item.title}</Text>}
          data={searchList}
          style={searchFocused ? styles.show : styles.hide}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  show: { position: "absolute" },
  hide: { display: "none" },
});
