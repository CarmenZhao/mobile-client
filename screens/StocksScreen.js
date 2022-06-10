import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View /* include other react-native components here as needed */,
  Text,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

function MyList(props) {
  return (
    <View>
      {props.symbols.map((x) => (
        <Text key={x} style={styles.display}>
          {x}
        </Text>
      ))}
    </View>
  );
}

export default function StocksScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState({
    /* FixMe: initial state here */
  });

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
  }, [watchList]);

  return (
    <View style={styles.container}>
      <MyList symbols={watchList} />
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "white",
  },
});
