import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";
import { GetStockDetails } from "../api2";
import RBSheet from "react-native-raw-bottom-sheet";
import StockDetailCard from "../components/StockDetailCard";
import { set } from "react-native-reanimated";

export default function StocksScreen({ route }) {
  const { ServerURL, watchList, removeFromWatchlist } = useStocksContext();
  const [myList, setMyList] = useState([]);
  //const [stockInfo, setStockInfo] = useState([]);
  const refRBSheet = useRef();
  const [stockDetails, setStockDetails] = useState([]);
  const windowHeight = Dimensions.get("window").height;
  const [Symbol, setSymbol] = useState([]);
  const API_KEY = "5eb49566d020d9a874bb1c9ca820370a";

  function getDetails(list) {
    let tempList = [];
    list.map(async (s) => {
      console.log(s);
      let res = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${s}?apikey=${API_KEY}`
      );
      let company = await res.json();
      let price = company[0].price;
      let changesPercentage = company[0].changesPercentage;

      let tmpObj = {
        symbol: s,
        price: price,
        changesPercentage: changesPercentage,
      };

      tempList.push(tmpObj);
    });
    return tempList;

    // let tempList = [];
    // list.map((s) => {
    //   fetch(
    //     `https://financialmodelingprep.com/api/v3/quote/${s}?apikey=${API_KEY}`
    //   )
    //     .then((res) => res.json)
    //     .then((company) => {
    //       console.log(company);
    //       let price = company[0].price;
    //       let changesPercentage = company[0].changesPercentage;

    //       let tmpObj = {
    //         symbol: s,
    //         price: price,
    //         changesPercentage: changesPercentage,
    //       };

    //       tempList.push(tmpObj);
    //     });
    //   return tempList;
    // });
    // console.log(tempList.price);

    // //let stockDetails = {};
    // let listTemp = {};
    //  list.map(async (s) => {
    //   console.log(s);
    //   let res = await fetch(
    //     `https://financialmodelingprep.com/api/v3/quote/${s}?apikey=${API_KEY}`
    //   );

    //   let company = await res.json();
    //   // console.log("company" + company);
    //   // console.log(company[0].price);

    //   //let temp = {
    //   //price: company[0].price,
    //   //changesPercentage: company[0].changesPercentage,
    //   //};

    //   listTemp.s = "checkkk";

    //   //console.log("tessss " + s);
    //   //console.log(stockDetails[s]);
    // });
    // console.log("sssss" + listTemp["AAPL"]);
    // // for (let key in listTemp.ent) {
    // //   console.log(key);
    // // }

    // return stockDetails;
  }

  //list.map((e) => {
  //console.log(e);
  //const { loading, compData, error } = GetStockDetails(e);
  //console.log(compData);
  // let closePrice = response.price;
  // let percentage = response.changesPercentage;
  // console.log(closePrice, +" " + percentage);
  // detailCollection.push({
  //   symbol: e,
  //   closePrice: closePrice,
  //   percentage: percentage,
  //});
  //});
  //console.log(detailCollection);

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    //setMyList(watchList);
    getDetails(watchList).then((value) => console.log(value));

    //setMyList(tempList);

    //console.log(TMP[0]);
    //console.log(TMP[1]);
    //setStockDetails(TMP);
    // watchList.map((e) => {
    //   console.log(e);
    //   let response = GetStockDetails(e);
    //   console.log(response);
    //   let closePrice = response.price;
    //   let percentage = response.changesPercentage;
    //   console.log(closePrice, +" " + percentage);
    //   detailsCollection.push({
    //     symbol: e,
    //     closePrice: closePrice,
    //     percentage: percentage,
    //   });
    // });
  }, [watchList]);

  // useEffect(() => {
  //   myList.map((stock) => {
  //     console.log(stock);
  //   });
  // }, [myList]);

  return (
    <View style={styles.container}>
      <View style={styles.stockList}>
        <ScrollView>
          {myList.map((e) => (
            <View style={styles.stockItem} key={e.symbol}>
              <Text
                style={styles.symbol}
                onPress={() => {
                  refRBSheet.current.open();
                  setSymbol(e.symbol);
                }}
              >
                {symbol}
              </Text>
              <View>
                <Text style={styles.symbol}>{e.price}</Text>
              </View>
            </View>
          ))}
          {/* {myList.map((e) => (
            <Text>{e}</Text>
          ))} */}
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
});
