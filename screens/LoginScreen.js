import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";

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
    if (!data.hasOwnProperty("error")) {
      console.log(data);
      setIsLoggedIn(true);
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("loginuser", data.user);
      if (data.watchlist) {
        AsyncStorage.setItem("watchlist", data.watchlist.toString()); //!!!!!!!!!
      }

      console.log(typeof data.watchlist);

      /*check asyncStorage, can delete later*/
      console.log("Check async after login");
      try {
        const value = await AsyncStorage.getItem("loginuser");
        if (value !== null) {
          console.log(value);
        }
      } catch (error) {
        console.log(error);
      }
      /*check asyncStorage, can delete later*/

      navigation.navigate("Home");
    } else {
      console.log("failed");
      //need error handling!!!!!
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
      <Button
        title="Register"
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
