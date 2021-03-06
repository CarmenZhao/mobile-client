import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ symbol, name }) => {
  const { addToWatchlist } = useStocksContext();
  return (
    <View style={styles.item}>
      <Text
        style={styles.symbol}
        onPress={() => {
          addToWatchlist(symbol);
          console.log("pressed");
        }}
      >
        {symbol}
      </Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

// the filter
const StockList = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item symbol={item.symbol} name={item.name} />; //onPress
    }
    // filter of the symbol
    if (
      item.symbol
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item symbol={item.symbol} name={item.name} />;
    }
    // filter of the description
    if (
      item.name
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item symbol={item.symbol} name={item.name} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
        />
      </View>
    </SafeAreaView>
  );
};

export default StockList;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    //height: "85%",
    width: "100%",
  },
  name: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    color: "white",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
    color: "white",
  },
});
