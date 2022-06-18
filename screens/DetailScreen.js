import React from "react";
import { useState, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import StockDetailCard from "../components/StockDetailCard";
// import InfoTable from "../components/InfoTable";

import { UseStockData } from "../api2";
import {
  StyleSheet,
  View /* include other react-native components here as needed */,
  Text,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";

export default function StockDetailScreen(props) {
  const { loading, rowData, compData, error } = UseStockData(props.Symbol);
  const refRBSheet = useRef();
  const windowHeight = Dimensions.get("window").height;

  if (loading) {
    return <Text>loading</Text>;
  }
  if (error != null) {
    return <Text>Error</Text>;
  }

  return (
    <>
      <View>
        <Button
          title="OPEN BOTTOM SHEET"
          onPress={() => refRBSheet.current.open()}
        />
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
          
              <StockDetailCard data={compData} rowData={rowData} />
          
          </RBSheet>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  RBSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
});
