import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, Card } from "react-native-paper";
import InfoChart from "../components/Chart";
import { UseStockData, GetStockDetails } from "../api2";
import { CurrentRenderContext } from "@react-navigation/core";

export default function StockDetailCard(props) {
  const { loading, rowData, error } = UseStockData(props.Symbol);
  const { loading2, compData, error2 } = GetStockDetails(props.Symbol);
  console.log(compData);
  const dataChange = parseFloat(compData.changesPercentage).toFixed(2);
  const vol = kFormatter(compData.volume);
  const MC = kFormatter(compData.mktCap);

  if (loading && loading2) {
    return <Text>loading</Text>;
  }
  if (error != null && error2 != null) {
    return <Text>Error</Text>;
  }
  function kFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.ComName}>{compData.name}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 2,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        />
        <View style={styles.priceDetail}>
          <Text style={{ fontSize: 18, fontWeight: "bold", flex: 3 }}>
            ${compData.price}
          </Text>
          <Text style={dataChange > 0 ? styles.textGreen : styles.textRed}>
            {dataChange}%
          </Text>
          <Text style={{ flex: 3 }}>{compData.exchange}</Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <InfoChart rowData={rowData} />
      </View>

      <View style={styles.container}>
        <View style={styles.cards}>
          <List.Item
            style={styles.listStyle}
            title={"Open  " + compData.open}
            // right={(props) => <Text>{props.data.open}</Text>}
            left={(props) => (
              <List.Icon
                {...props}
                icon="trending-up"
                style={styles.iconStyle}
              />
            )}
          />

          <List.Item
            style={styles.listStyle}
            title={"High " + compData.dayHigh}
            left={(props) => (
              <List.Icon {...props} icon="arrow-up" style={styles.iconStyle} />
            )}
          />
          <List.Item
            style={styles.listStyle}
            title={"Low " + compData.dayLow}
            // right={props.data.dayLow}
            left={(props) => (
              <List.Icon
                {...props}
                icon="arrow-down"
                style={styles.iconStyle}
              />
            )}
          />
        </View>
        <View style={styles.verticleLine}></View>
        <View style={styles.cards}>
          <List.Item
            style={styles.listStyle}
            title={"eps  " + compData.eps}
            // right={(props) => <Text>{props.data.open}</Text>}
            left={(props) => (
              <List.Icon
                {...props}
                icon="trending-up"
                style={styles.iconStyle}
              />
            )}
          />

          <List.Item
            style={styles.listStyle}
            title={"Vol. " + vol}
            left={(props) => (
              <List.Icon {...props} icon="arrow-up" style={styles.iconStyle} />
            )}
          />
          <List.Item
            style={styles.listStyle}
            title={"Mkt Cap " + MC}
            // right={props.data.dayLow}
            left={(props) => (
              <List.Icon
                {...props}
                icon="arrow-down"
                style={styles.iconStyle}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  cards: {
    flex: 1,
    margin: 5,
  },
  ComName: {
    // fontFamily: "arial",
    // fontStyle: "Bold",
    // fontWeight: 800,
    fontSize: 26,
    lineHeight: 30,
    color: "#000000",
    marginStart: 30,
    marginTop: 10,
  },
  priceDetail: {
    marginStart: 30,
    flexDirection: "row",
  },
  textRed: {
    marginStart: 10,
    fontWeight: "bold",
    color: "#FF463E",
    flex: 3,
  },
  textGreen: {
    marginStart: 10,
    fontWeight: "bold",
    color: "#00C26D",
    flex: 3,
  },

  listStyle: {
    marginVertical: -10,
    padding: 0,
  },
  verticleLine: {
    height: "80%",
    width: 1,
    backgroundColor: "#909090",
    marginTop: 10,
  },

  iconStyle: {
    marginRight: -10,
  },
});
