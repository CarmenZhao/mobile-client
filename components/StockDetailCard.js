import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, Card } from "react-native-paper";
import InfoChart from "../components/Chart";

export default function StockDetailCard(props) {

const dataChange = parseFloat(props.data.changesPercentage).toFixed(2);


  return (
    <ScrollView>
      <View>
        <Text style={styles.ComName}>{props.data.name}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 2,
            margin: 15,
          }}
        />
        <View style={styles.priceDetail}>
          <Text style={{ fontSize: 18, fontWeight: "bold", flex: 3 }}>
            ${props.data.price}
          </Text>
          <Text style={dataChange > 0 ? styles.textGreen : styles.textRed}>
            {dataChange}%
          </Text>
          <Text style={{ flex: 3}}>{props.data.exchange}</Text>
        </View>
      </View>

      <View>
        <InfoChart rowData={props.rowData} />
      </View>

      <View style={styles.container}>
        <Card style={styles.cards}>
          <List.Item
            title={"Open  " + props.data.open}
            // right={(props) => <Text>{props.data.open}</Text>}
            left={(props) => <List.Icon {...props} icon="trending-up" />}
          />

          <List.Item
            title={"Day High " + props.data.dayHigh}
            left={(props) => <List.Icon {...props} icon="arrow-up" />}
          />
          <List.Item
            title={"Day Low " + props.data.dayLow}
            // right={props.data.dayLow}
            left={(props) => <List.Icon {...props} icon="arrow-down" />}
          />
        </Card>

        <Card style={styles.cards}>
          <List.Item
            title={"eps  " + props.data.eps}
            // right={(props) => <Text>{props.data.open}</Text>}
            left={(props) => <List.Icon {...props} icon="trending-up" />}
          />

          <List.Item
            title={"Volume " + props.data.volume}
            left={(props) => <List.Icon {...props} icon="arrow-up" />}
          />
          <List.Item
            title={"Mkt Cap " + props.data.mktCap}
            // right={props.data.dayLow}
            left={(props) => <List.Icon {...props} icon="arrow-down" />}
          />
        </Card>
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
    backgroundColor: "#1C1D22",
    margin: 10,
  },
  ComName: {
    // fontFamily: "arial",
    // fontStyle: "Bold",
    // fontWeight: 800,
    fontSize: 26,
    lineHeight: 30,
    color: "#000000",
    marginStart: 15,
  },
  priceDetail: {
    marginStart: 15,
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
});
