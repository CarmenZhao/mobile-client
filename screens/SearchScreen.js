// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
//   Keyboard /* include other react native components here as needed */,
// } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { useStocksContext } from "../contexts/StocksContext";
// import { scaleSize } from "../constants/Layout";
// import { Ionicons } from "@expo/vector-icons";

// import { useStockAPI } from "../api";

// import SearchBar from "../components/SearchBar";
// import StockList from "../components/StockList";

// // FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

// export default function SearchScreen({ navigation }) {
//   const { ServerURL, addToWatchlist } = useStocksContext();
//   const { loading, stockData, error } = useStockAPI();
//   const [state, setState] = useState([]);

//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [clicked, setClicked] = useState(false);

//   // can put more code here

//   useEffect(() => {
//     // FixMe: fetch symbol names from the server and save in local SearchScreen state
//     setState(stockData);
//   }, [stockData]);

//   return (
//     // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     //   <View style={styles.container}>
//     //     <SearchBar />
//     //     {state.map((e) => (
//     //       <Text style={styles.display}>{e.symbol}</Text>
//     //     ))}
//     //   </View>
//     // </TouchableWithoutFeedback>
//     //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={styles.root}>
//         {!clicked && <Text style={styles.title}>Stocks</Text>}
//         <Text style={styles.hintText}>Type a stock symbol or company name</Text>
//         <SearchBar
//           searchPhrase={searchPhrase}
//           setSearchPhrase={setSearchPhrase}
//           clicked={clicked}
//           setClicked={setClicked}
//         />

//         {!state ? (
//           <ActivityIndicator size="large" />
//         ) : (
//           <StockList
//             searchPhrase={searchPhrase}
//             data={state}
//             setClicked={setClicked}
//           />
//         )}
//       </SafeAreaView>
//     //</TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     width: "100%",
//     marginTop: 20,
//     fontSize: 25,
//     fontWeight: "bold",
//     marginLeft: "10%",
//     color: "white",
//   },
//   hintText:{
//     color:"white",
//     textAlign:"center",
//     marginVertical:scaleSize(5)
//   }
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  Button,
} from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, ScrollView } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import { useStockAPI } from "../api";
import SearchBar from "../components/SearchBar";

// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist, watchList } = useStocksContext();
  const { loading, stockData, error } = useStockAPI();
  const [searchText, setSearchText] = useState("");
  const [allStocks, setAllStocks] = useState([]); //all stocks from api
  const [filteredStocks, setFilteredStocks] = useState([]); //stock filtered by user input

  function FilterStock(text) {
    let temp = allStocks.filter((stock) =>
      RegExp(text, "i").test(stock.symbol)
    );
    setFilteredStocks(temp);
  }

  useEffect(() => {
    // FixMe: fetch symbol names from the server and save in local SearchScreen state

    setAllStocks(stockData);
    setFilteredStocks(stockData);
  }, [stockData]);

  return (
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    //</TouchableWithoutFeedback>
  );
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
    color: "white",
    fontSize: scaleSize(20),
  },

  searchPhrase: {
    flex: 1,
    color: "#fff",
  },

  sybmbolDiv: {
    flexDirection: "row",
  },

  symbol: {
    paddingHorizontal: scaleSize(10),
    paddingTop: scaleSize(10),
    fontSize: scaleSize(20),
    color: "#fff",
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
