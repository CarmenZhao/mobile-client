import React, { useState } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const { ServerURL, setIsLoggedIn } = useStocksContext();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  //request back-end for authentication
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
    console.log(data);
    if (data.error != true) {
      setIsLoggedIn(true);
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("loginuser", data.user);
    } else {
      alert(data.message);
    }
  }

  return (
    <View>
      <TextInput
        style={styles.display}
        onChangeText={setInputEmail}
        value={inputEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.display}
        onChangeText={setInputPassword}
        value={inputPassword}
        placeholder="Password"
      />
      <Button title="Login" onPress={login} />
      {/* redirect to register screen */}
      <Button
        title="Create an Account"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "black",
  },
});
