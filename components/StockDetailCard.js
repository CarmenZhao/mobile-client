import { View, Text, StyleSheet } from "react-native";
import { List, Card } from "react-native-paper";
import InfoChart from "../components/Chart";
import { UseStockData, GetStockDetails } from "../api2";
import { CurrentRenderContext } from "@react-navigation/core";
import { GetLoadingText } from "./loading";
import { scaleSize } from "../constants/Layout";
import { MyTable } from "./table";
import { ScrollView } from "react-native-gesture-handler";
import { GetNews } from "./GetNews";
import { NewsCard } from "./NewsCard";

export default function StockDetailCard(props) {
  const { loading, rowData, error } = UseStockData(props.Symbol);
  const { loading2, compData, error2 } = GetStockDetails(props.Symbol);
  const { loading3, newsData, error3 } = GetNews(props.Symbol);

  const dataChange = parseFloat(compData.changesPercentage).toFixed(2);
  const vol = kFormatter(compData.volume);
  const MC = kFormatter(compData.mktCap);

  if (loading || loading2 || loading3) {
    return <GetLoadingText />;
  }
  if (error != null || error2 != null || error3 != null) {
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <MyTable compData={compData} style={{ marginHorizontal: 20 }} />
        {newsData != null ? <NewsCard data={newsData} /> : <Text>No news</Text>}
        {/* <NewsCard data={newsData} /> */}
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
    fontFamily: "Helvetica-Bold",
    // fontStyle: "Bold",
    // fontWeight: 800,
    fontSize: 20,
    //fontSize: scaleSize(20),
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
