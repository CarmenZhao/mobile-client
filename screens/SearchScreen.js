import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import { useStockAPI } from "../api";
import SearchBar from "../components/SearchBar";
import { GetLoadingPage } from "../components/loading";

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist, watchList } = useStocksContext();
  const { loading, stockData, error } = useStockAPI();
  const [searchText, setSearchText] = useState("");
  //all stocks from api
  const [allStocks, setAllStocks] = useState([]);
  //stock filtered by user search input
  const [filteredStocks, setFilteredStocks] = useState([]);

  const FilterStock = (text) => {
    let temp = allStocks.filter(
      (stock) => RegExp(text, "i").test(stock.name)
      //RegExp(text, "i").test(stock.name);
    );
    setFilteredStocks(temp);
  };

  useEffect(() => {
    setAllStocks(stockData);
    setFilteredStocks(stockData);
  }, [stockData]);

  if (loading) {
    return <GetLoadingPage />;
  } else {
    return (
      <View style={styles.container}>
        <SearchBar defaultText={searchText} handleSearch={FilterStock} />
        <ScrollView>
          {filteredStocks.map((stock) => (
            <View key={stock.symbol} style={styles.rowStyle}>
              <View style={styles.sybmbolDiv}>
                <Text style={styles.symbol}>{stock.symbol}</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    addToWatchlist(stock.symbol);
                    alert(`${stock.symbol} added to watchlist`);
                    navigation.jumpTo("Stocks");
                  }}
                >
                  <Text style={styles.btnText}> + </Text>
                </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  addBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnText: {
    fontSize: scaleSize(28),
  },

  symbol: {
    flex: 1,
    paddingHorizontal: scaleSize(10),
    paddingTop: scaleSize(26),
    paddingBottom: 5,
    fontSize: scaleSize(28),
    color: "black",
  },

  name: {
    paddingHorizontal: scaleSize(10),
    color: "black",
  },

  space: {
    marginTop: scaleSize(10),

    //borderBottomColor: "rgba(6,7,10,0.2)",
    borderBottomColor: "#E4E8ED",
    borderBottomWidth: scaleSize(1),
  },
  rowStyle: {
    marginHorizontal: scaleSize(20),
  },
});
