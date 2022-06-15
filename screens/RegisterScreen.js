import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  Button,
} from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, ScrollView } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import { useStockAPI } from "../api";
import SearchBar from "../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const { ServerURL } = useStocksContext();
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);

  async function register() {
    const url = `${ServerURL}/users/register`;

    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // email: "carmen.zhao1027@gmail.com",
        // password: "102Zjm",
        email: userEmail,
        password: userPassword,
      }),
    });
    let data = await res.json();
    console.log(data.error);
    if (data.hasOwnProperty("error") && data.error != true) {
      //AsyncStorage.setItem("token", data.token);
      console.log(data);
      navigation.navigate("Login");
    } else {
      console.log("failed");
    }
  }
  return (
    // <div className="App">
    //   <h1>JWT Token example</h1>
    //   <button onClick={login}>Login</button>
    // </div>
    <View>
      <TextInput
        style={styles.display}
        onChangeText={setUserEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.display}
        onChangeText={setUserPassword}
        placeholder="Password"
      />
      <Button title="Sign Up" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "white",
  },
});
