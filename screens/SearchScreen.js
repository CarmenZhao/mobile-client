import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import { useStockAPI } from "../api";
import SearchBar from "../components/SearchBar";

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist, watchList } = useStocksContext();
  const { loading, stockData, error } = useStockAPI();
  const [searchText, setSearchText] = useState("");
  //all stocks from api
  const [allStocks, setAllStocks] = useState([]);
  //stock filtered by user search input
  const [filteredStocks, setFilteredStocks] = useState([]);

  const FilterStock = (text) => {
    let temp = allStocks.filter((stock) =>
      RegExp(text, "i").test(stock.symbol)
    );
    setFilteredStocks(temp);
  };

  useEffect(() => {
    setAllStocks(stockData);
    setFilteredStocks(stockData);
  }, [stockData]);

  if (loading) {
    return <Text>Loading...</Text>;
  } else if (error) {
    return <Text>Oops...something went wrong</Text>;
  } else {
    return (
      <View style={styles.container}>
        <SearchBar defaultText={searchText} handleSearch={FilterStock} />
        <ScrollView>
          {filteredStocks.map((stock) => (
            <View key={stock.symbol}>
              <View style={styles.sybmbolDiv}>
                <Text style={styles.symbol}>{stock.symbol}</Text>
                <Button
                  title="Add"
                  onPress={() => {
                    addToWatchlist(stock.symbol);
                  }}
                />
              </View>
              <Text style={styles.name}>{stock.name}</Text>
              <View style={styles.space} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    height: scaleSize(40),
  },

  searchIcon: {
    paddingHorizontal: scaleSize(15),
    color: "black",
    fontSize: scaleSize(20),
  },

  searchPhrase: {
    flex: 1,
    color: "black",
  },

  sybmbolDiv: {
    flexDirection: "row",
  },

  symbol: {
    paddingHorizontal: scaleSize(10),
    paddingTop: scaleSize(10),
    fontSize: scaleSize(20),
    color: "black",
  },

  name: {
    paddingHorizontal: scaleSize(10),
    color: "#fff",
  },

  space: {
    marginTop: scaleSize(10),
    borderBottomColor: "#2F2F2F",
    borderBottomWidth: scaleSize(1),
  },
});
