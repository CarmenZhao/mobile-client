import * as React from "react";
import { DataTable, List } from "react-native-paper";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

//const optionsPerPage = [2, 3, 4];

export function MyTable(props) {
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
  const windowWidth = Dimensions.get("window").width;
  const vol = kFormatter(props.compData.volume);
  const MC = kFormatter(props.compData.mktCap);

  return (
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>Open</DataTable.Cell>
        <DataTable.Cell numeric>{props.compData.open} </DataTable.Cell>
        <DataTable.Cell style={{ marginLeft: 8 }}> eps</DataTable.Cell>
        <DataTable.Cell numeric>{props.compData.eps}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>High</DataTable.Cell>
        <DataTable.Cell numeric>{props.compData.dayHigh} </DataTable.Cell>
        <DataTable.Cell style={{ marginLeft: 8 }}> Vol.</DataTable.Cell>
        <DataTable.Cell numeric>{vol}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Low</DataTable.Cell>
        <DataTable.Cell numeric>{props.compData.dayLow} </DataTable.Cell>
        <DataTable.Cell style={{ marginLeft: 8 }}> Mkt Cap</DataTable.Cell>
        <DataTable.Cell numeric>{MC}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination />
    </DataTable>
  );
}
const styles = StyleSheet.create({
  iconStyle: {
    marginRight: -10,
  },
});
