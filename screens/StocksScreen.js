import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View /* include other react-native components here as needed */,
  Text,
  Button,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";

// FixMe: implement other components and functions used in //StocksScreen here (don't just put all the JSX in StocksScreen below)

function MyList(props) {

//onst [open, setOpen] = useState(false);
  return (
    <View>
      {props.symbols.map((x) => (
        <Text key={x} onPress={open} style={styles.display}>
          {x}
          {/* <Button onClick={() => setOpen(true)}>Open</Button>
          <StockDetailScreen Symbol={testSymbol} Open={open}/> */}
          {/* 需要传一个open的值 给detail page */}
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
