// import React from "react";
// import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
// import { Feather, Entypo } from "@expo/vector-icons";

// const SearchBar = (props) => {
//   return (
//     <View style={styles.container}>
//       <View
//         style={
//           !props.clicked
//             ? styles.searchBar__unclicked
//             : styles.searchBar__clicked
//         }
//       >
//         <Feather
//           name="search"
//           size={20}
//           color="black"
//           style={{ marginLeft: 1 }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           value={props.searchPhrase}
//           onChangeText={props.setSearchPhrase}
//           onFocus={() => {
//             props.setClicked(true);
//           }}
//         />

//         {props.clicked && (
//           <Entypo
//             name="cross"
//             size={20}
//             color="black"
//             style={{ padding: 1 }}
//             onPress={() => {
//               props.setSearchPhrase("");
//             }}
//           />
//         )}
//       </View>
//       {props.clicked && (
//         <View>
//           <Button
//             title="Cancel"
//             onPress={() => {
//               Keyboard.dismiss();
//               props.setClicked(false);
//             }}
//           ></Button>
//         </View>
//       )}
//     </View>
//   );
// };

// export default SearchBar;

// const styles = StyleSheet.create({
//   container: {
//     margin: 15,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//     width: "90%",
//   },
//   searchBar__unclicked: {
//     padding: 10,
//     flexDirection: "row",
//     width: "95%",
//     backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   searchBar__clicked: {
//     padding: 10,
//     flexDirection: "row",
//     width: "80%",
//     backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   input: {
//     fontSize: 20,
//     marginLeft: 10,
//     width: "90%",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
} from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import { useStockAPI } from "../api";

export default function SearchBar(props) {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchPhrase}
        placeholder="Search by stock symbol or company name"
        placeholderTextColor="rgba(6,7,10,0.5)"
        defaultValue={props.defaultText}
        onChangeText={(text) => props.handleSearch(text)}
      />
      <View style={styles.frame}>
        <Ionicons name="md-search" style={styles.searchIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0)",
    height: scaleSize(50),
  },

  searchIcon: {
    padding: scaleSize(15),
    paddingTop: scaleSize(10),

    // paddingHorizontal: scaleSize(15),
    color: "black",
    fontSize: scaleSize(25),
  },

  searchPhrase: {
    paddingLeft: 20,
    flex: 6,
    color: "black",
    height: "100%",
    borderColor: "#E4E8ED",
    borderRightWidth: 0,
    borderStyle: "solid",
    borderWidth: 1,
  },
  frame: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    borderColor: "#E4E8ED",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
