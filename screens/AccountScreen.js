import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const { setIsLoggedIn } = useStocksContext();
  async function logout() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log(keys);
      await AsyncStorage.multiRemove(keys);
      console.log("clear storage");
      setIsLoggedIn(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error clearing app data.");
    }
  }

  return (
    <View>
      <Button title="LogOut" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "white",
  },
});
