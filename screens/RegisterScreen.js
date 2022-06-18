import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { useStocksContext } from "../contexts/StocksContext";

export default function RegisterScreen({ navigation }) {
  const { ServerURL } = useStocksContext();
  const [inputUserEmail, setInputUserEmail] = useState(null);
  const [inputUserPassword, setInputUserPassword] = useState(null);

  //request back-end to register a new user
  async function register() {
    const url = `${ServerURL}/users/register`;
    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputUserEmail,
        password: inputUserPassword,
      }),
    });
    let data = await res.json();
    console.log(data.error);
    if (data.error != true) {
      console.log(data);
      navigation.navigate("Login"); //redirect to login screen after successful registration
    } else {
      console.log("failed");
      //need error handling
    }
  }
  return (
    <View>
      <TextInput
        style={styles.display}
        onChangeText={setInputUserEmail}
        value={inputUserEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.display}
        onChangeText={setInputUserPassword}
        value={inputUserPassword}
        placeholder="Password"
      />
      <Button title="Sign Up" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "black",
  },
});
