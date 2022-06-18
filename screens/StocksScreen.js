import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";

import StockDetailScreen from "./DetailScreen";

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    setMyList(watchList);
  }, [watchList]);

  return (
    <View style={styles.container}>
      <View style={styles.stockList}>
        <ScrollView>
          {myList.map((symbol) => (
            <View style={styles.stockItem} key={symbol}>
              <Text
                style={styles.symbol}
                onPress={() => {
                  let index = myList.indexOf(symbol);
                  if (index !== -1) {
                    console.log(index);
                    myList.map((x) => console.log(x));
                  }
                  removeFromWatchlist(symbol);
                }}
              >
                {symbol}
              </Text>
              <View>
                <Text style={styles.symbol}>
                  put close price and percentage
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //default, get full space
  },

  stockList: {
    flex: 4, //get 4/5 space
  },

  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleSize(10),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: "#2F2F2F",
  },

  stockItemRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  symbol: {
    color: "black",
    fontSize: scaleSize(20),
  },

  closingPrice: {
    color: "black",
    fontSize: scaleSize(20),
    marginRight: scaleSize(20),
  },

  percentageGainOrLossContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",

    width: scaleSize(100),
    height: scaleSize(35),
    borderRadius: scaleSize(10),
  },

  percentageGainOrLoss: {
    color: "black",
    fontSize: scaleSize(20),
    paddingRight: scaleSize(5),
  },

  // start of stock detail css
  stockDetail: {
    flex: 1, //get 1/5 space
    backgroundColor: "#202122",
  },

  stockHeader: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: scaleSize(0.5),
    borderBottomColor: "#BCBCBC",
  },

  stockName: {
    color: "black",
    fontSize: scaleSize(20),
  },

  stockDetailRow: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: scaleSize(1),
    borderBottomColor: "#404142",
  },

  stockProperty: {
    flex: 1, // get 1/(1+1) => 1/2 space
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleSize(3),
  },

  stockPropertyName: {
    color: "#616263",
  },

  stockPropertyValue: {
    color: "black",
    fontSize: scaleSize(15),
  },
});
