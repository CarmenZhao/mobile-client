import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  ImageBackground,
  Text,
} from "react-native";

import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
//import { TextInput } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

import { useStocksContext } from "../contexts/StocksContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <ImageBackground
        source={require("../assets/images/logbg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2, justifyContent: "flex-end" }}>
            <Text
              style={{
                fontFamily: "HelveticaNeue-Bold",
                fontSize: scaleSize(40),
                color: "white",
                textAlign: "center",
                marginVertical: 10,
                alignContent: "flex-end",
              }}
            >
              Hello!
            </Text>
            <Text
              style={{
                fontFamily: "HelveticaNeue",
                fontSize: scaleSize(15),
                color: "white",
                textAlign: "center",
                alignContent: "flex-end",
              }}
            >
              Welcome to Stock Genius
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TextInput
              left={<TextInput.Icon name="email" color="#FEFFFE" size="20" />}
              style={styles.emailInput}
              onChangeText={setInputEmail}
              value={inputEmail}
              placeholder="Email"
            />

            <TextInput
              left={<TextInput.Icon name="key" color="#FEFFFE" size="20" />}
              style={styles.pwInput}
              onChangeText={setInputPassword}
              value={inputPassword}
              secureTextEntry
              placeholder="Password"
            />
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "flexStart",
            }}
          >
            <TouchableOpacity onPress={login} style={styles.btn}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "HelveticaNeue-Bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            {/* redirect to register screen */}

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "white", fontSize: 15, marginTop: 30 }}>
                Create an Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  emailInput: {
    borderColor: "rgba(255,255,255,0.8)",
    borderBottomColor: "rgba(255,255,255,0)",
    borderWidth: 1,
    backgroundColor: "rgba(191,191,191,0.3)",
    width: scaleSize(290),
    height: scaleSize(55),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  pwInput: {
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    backgroundColor: "rgba(191,191,191,0.3)",
    width: scaleSize(290),
    height: scaleSize(55),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",

    justifyContent: "center",
    marginTop: 30,
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
