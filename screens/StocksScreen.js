import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import { GetStockDetails, getPrice } from "../api2";
import RBSheet from "react-native-raw-bottom-sheet";
import StockDetailCard from "../components/StockDetailCard";
import { GetLoadingPage } from "../components/loading";
import { render } from "react-dom";

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [myList, setMyList] = useState([]);
  const refRBSheet = useRef();
  const windowHeight = Dimensions.get("window").height;
  const [Symbol, setSymbol] = useState([]);
  //const { loading2, priceData, changeData, error } = getPrice(watchList);
  const [allSymbol, setAllSymbol] = useState([]);
  const [allSymbolData, setSymbolData] = useState([]);
  //const API_KEY = "5eb49566d020d9a874bb1c9ca820370a";
  const API_KEY = "9bdf814120dd203b072c0828821bd0e2";
  const [loading, setLoading] = useState(true);

  //everything when the user add a new stock into the watchlist
  //the system will get all the price and change of the symbol of the watchlist
  //for stock screen
  useEffect(() => {
    let tempList = [];
    Promise.all(
      watchList.map((stockSymbol) =>
        fetch(
          `https://financialmodelingprep.com/api/v3/quote/${stockSymbol}?apikey=${API_KEY}`
        )
      )
    )
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        console.log(data);
        data.map((e) => {
          let obj = {
            symbol: e[0].symbol,
            price: e[0].price,
            change: e[0].changesPercentage.toFixed(2),
          };
          tempList.push(obj);
        });
        console.log(tempList);
        setMyList(tempList);
        setLoading(false);
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }, [watchList]);
  //return loading page when data is not gathering completely
  if (loading) {
    return <GetLoadingPage />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.stockList}>
          <ScrollView>
            {myList.map((e) => (
              <Pressable
                key={e.symbol}
                onPress={() => {
                  refRBSheet.current.open();
                  setSymbol(e.symbol);
                }}
                onLongPress={() => {
                  Alert.alert("Alert", "Remove from watchlist?", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => removeFromWatchlist(e.symbol),
                    },
                  ]);
                }}
              >
                <View style={styles.stockItem} key={e.symbol}>
                  <Text style={styles.symbol}>{e.symbol}</Text>
                  <View
                    style={{ flexDirection: "column", alignItems: "flex-end" }}
                  >
                    <Text style={styles.price}>${e.price}</Text>
                    <View
                      style={e.change > 0 ? styles.badgeGreen : styles.badgeRed}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: scaleSize(11),
                          textAlign: "center",
                        }}
                      >
                        {e.change}%
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View></View>

        <View>
          <RBSheet
            animationType={"slide"}
            ref={refRBSheet}
            // closeOnDragDown={true}
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
    marginHorizontal: scaleSize(20),
    marginTop: scaleSize(10),
    borderBottomColor: "#E4E8ED",
    borderBottomWidth: scaleSize(1),
  },

  symbol: {
    flex: 1,
    paddingTop: scaleSize(26),
    paddingBottom: scaleSize(10),
    fontSize: scaleSize(30),
    color: "black",
  },

  // start of stock detail css
  stockDetail: {
    flex: 1, //get 1/5 space
    backgroundColor: "#202122",
  },

  price: {
    fontSize: scaleSize(20),
  },

  badgeGreen: {
    marginTop: scaleSize(3),
    color: "white",
    backgroundColor: "#00C26D",
    borderRadius: 10,
    width: 40,
  },

  badgeRed: {
    marginTop: scaleSize(8),
    color: "white",
    backgroundColor: "#FF463E",
    borderRadius: 10,
    width: 40,
  },
});
