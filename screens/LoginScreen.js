import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, ScrollView } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const { ServerURL } = useStocksContext();
  const [inputEmail, setInputEmail] = useState(null);
  const [inputPassword, setInputPassword] = useState(null);

  async function login() {
    const url = `${ServerURL}/users/login`;

    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword,
      }),
    });
    let data = await res.json();
    if (!data.hasOwnProperty("error")) {
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("loginuser", data.user);
      AsyncStorage.setItem("watchlist", data.watchlist);
      console.log(data); //set watchlist
      //let m = data.watchlist.split(",");
      //m.map((e) => console.log(e));
      navigation.navigate("Home");
    } else {
      console.log("failed");
    }
  }

  return (
    <View>
      <TextInput
        style={styles.display}
        onChangeText={setInputEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.display}
        onChangeText={setInputPassword}
        placeholder="Password"
      />
      <Button title="Login" onPress={login} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "white",
  },
});
