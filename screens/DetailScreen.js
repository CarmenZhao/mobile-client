import React from "react";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { UseStockData } from "../api2";
import {
  StyleSheet,
  View /* include other react-native components here as needed */,
  Text,
} from "react-native";
import ComDetails from "../components/ComDetails";
import InfoChart from "../components/Chart";

export default function StockDetailScreen(props) {
  console.log(props.Symbol);
  console.log(props.Open);

  const [open, setOpen] = useState(false);
  const { loading, rowData, compData, error } = UseStockData(props.Symbol);
  console.log(rowData);
  function onDismiss() {
    setOpen(false);
  }
  if (loading) {
    console.log("1");
    return <Text>loading</Text>;
  }
  if (error != null) {
    console.log("2");
    return <Text>Error</Text>;
  }

  console.log("3");
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        snapPoints={({ minHeight, maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
      >
        My awesome content here
        <ComDetails compData={compData} />
        <InfoChart rowData={rowData} />
      </BottomSheet>
    </>
  );
}
const styles = StyleSheet.create({});
