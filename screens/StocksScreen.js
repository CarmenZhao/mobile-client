import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View /* include other react-native components here as needed */,
  Text,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { set } from "react-native-reanimated";

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

function MyList(props) {
  const { removeFromWatchlist, watchList } = useStocksContext();
  return (
    <View>
      {props.symbols.map((x) => (
        <Text
          key={x}
          style={styles.display}
          onPress={() => {
            removeFromWatchlist(x);
          }}
        >
          {x}
        </Text>
      ))}
    </View>
  );
}

export default function StocksScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [state, setState] = useState([]);

  useEffect(() => {
    // FixMe: fetch stock data from the server for any new symbols added to the watchlist and save in local StocksScreen state
    setState(watchList);
  }, [watchList]);

  return (
    <View style={styles.container}>
      {/* <MyList symbols={watchList} /> */ <MyList symbols={state} />}
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "white",
  },
});
