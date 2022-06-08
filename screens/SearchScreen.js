import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";

import { useStockAPI } from "../api";

import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";

// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const { loading, stockData, error } = useStockAPI();
  const [state, setState] = useState([]);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  // can put more code here

  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    setState(stockData);
  }, [stockData]);

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container}>
    //     <SearchBar />
    //     {state.map((e) => (
    //       <Text style={styles.display}>{e.symbol}</Text>
    //     ))}
    //   </View>
    // </TouchableWithoutFeedback>
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Stocks</Text>}

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      {!state ? (
        <ActivityIndicator size="large" />
      ) : (
        <StockList
          searchPhrase={searchPhrase}
          data={state}
          setClicked={setClicked}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
    color: "white",
  },
});
