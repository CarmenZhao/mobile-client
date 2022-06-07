import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <View>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        placeholder="Type Here..."
        value={search}
      />
    </View>
  );
}
