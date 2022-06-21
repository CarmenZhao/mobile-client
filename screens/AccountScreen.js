import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

import { useStocksContext } from "../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const { setIsLoggedIn } = useStocksContext();
  const [user, setUser] = useState();

  async function logout() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      //console.log(keys);
      await AsyncStorage.multiRemove(keys);
      //console.log("clear storage");
      setIsLoggedIn(false);
      alert("Log out successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error clearing app data.");
    }
  }

  async function _retrieveUser() {
    try {
      const value = await AsyncStorage.getItem("loginuser");
      console.log("check user");
      console.log(value);
      if (value != null) {
        setUser(value);
      } else {
        setUser("");
      }
    } catch (error) {
      console.log(error);
      // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
    }
  }

  useEffect(() => {
    _retrieveUser();
  }, []);

  return (
    <View style={styles.display}>
      <Avatar.Icon
        size={60}
        icon="account-circle"
        style={{ marginVertical: 50 }}
      />
      <Text>{user}</Text>
      {/* <Button title="LogOut" onPress={logout} /> */}
      <TouchableOpacity onPress={logout} style={styles.btn}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "HelveticaNeue-Bold",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FFB429",
    width: scaleSize(290),
    height: scaleSize(45),
    borderRadius: 15,
    shadowColor: "#FFB429",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
});
