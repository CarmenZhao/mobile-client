import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import { GetStockDetails, getPrice } from "../api2";
import RBSheet from "react-native-raw-bottom-sheet";
import StockDetailCard from "../components/StockDetailCard";
//

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [myList, setMyList] = useState([]);
  const refRBSheet = useRef();
  const windowHeight = Dimensions.get("window").height;
  const [Symbol, setSymbol] = useState([]);
  const { loading, priceData, changeData, error } = getPrice(watchList);
  const [allSymbol, setAllSymbol] = useState([]);
  const [allSymbolData, setSymbolData] = useState([]);

  // if (loading) {
  //   return <Text>loading</Text>;
  // }
  // if (error != null) {
  //   return <Text>Error</Text>;
  // }

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    setMyList(watchList);
  }, [watchList]);

  useEffect(() => {
    let allSymbol = {};
    priceData.map((e) => (allSymbol[e.symbol] = e.price));
    setAllSymbol(allSymbol);
  }, [priceData]);

  useEffect(() => {
    let allSymbolData = {};
    changeData.map((e) => (allSymbolData[e.symbol] = e.change));
    setSymbolData(allSymbolData);
  }, [changeData]);

  return (
    <View style={styles.container}>
      <View style={styles.stockList}>
        <ScrollView>
          {myList.map((symbol2) => (
            <View style={styles.stockItem} key={symbol2}>
              <Text
                style={styles.symbol}
                onPress={() => {
                  console.log(allSymbol);
                  refRBSheet.current.open();
                  setSymbol(symbol2);
                }}
              >
                {symbol2}
              </Text>
              <View style={{ flexDirection: "column", alignItems: "end" }}>
                <Text style={styles.price}>{allSymbol[symbol2]}</Text>
                <View
                  style={
                    allSymbolData[symbol2] > 0
                      ? styles.badgeGreen
                      : styles.badgeRed
                  }
                >
                  <Text style={{ color: "white" }}>
                    {allSymbolData[symbol2]}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View></View>

      <View>
        <RBSheet
          animationType={"slide"}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={windowHeight / 1.2}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              backgroundColor: "rgba(242, 242, 242,1)",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              shadowColor: "black",
            },
          }}
        >
          <StockDetailCard Symbol={Symbol} />
        </RBSheet>
      </View>
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
  price: {
    fontSize: scaleSize(12),
  },
  badgeGreen: {
    fontSize: scaleSize(4),
    textAlign: "center",
    color: "white",
    backgroundColor: "#00C26D",
    borderRadius: 10,
    width: 40,
  },
  badgeRed: {
    fontSize: scaleSize(4),
    textAlign: "center",
    color: "white",
    backgroundColor: "#FF463E",
    borderRadius: 10,
    width: 40,
  },
});
