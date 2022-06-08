import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStockAPI } from "../api";
import StockList from "../components/StockList";
import SearchBar from "../components/SearchBar";

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const { loading, stockData, error } = useStockAPI();
  // const [state, setState] = useState({
  //   /* FixMe: initial state here */
  // });
  const [stockList, setStockList] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  // can put more code here

  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state
    setStockList(stockData);
  }, [stockData]);

  // function ShowStockList() {
  //   console.log(stockList);
  //   return (
  //     <View>
  //       {stockList.map((e) => (
  //         <Text style={styles.display}>
  //           {e.symbol} {e.name}
  //         </Text>
  //       ))}
  //     </View>
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.root}>
        {!clicked && <Text style={styles.title}>Stocks</Text>}

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

function Entry(props) {
  return (
    <View>
      <Text style={styles.symbol}>{props.symbol}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
}

function FilterList(props) {
  // when no input, show all
  if (props.searchPhrase === "") {
    return <Item name={item.name} details={item.details} />;
  }
}

// use scaleSize(x) to adjust sizes for small/large screens
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
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  name: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
