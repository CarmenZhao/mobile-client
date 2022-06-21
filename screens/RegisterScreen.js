import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
//import { TextInput } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useStocksContext } from "../contexts/StocksContext";
import { BottomSheetTest } from "../components/BottomSheet";

export default function RegisterScreen({ navigation }) {
  const { ServerURL } = useStocksContext();
  const [inputUserEmail, setInputUserEmail] = useState("");
  const [inputUserPassword, setInputUserPassword] = useState("");

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
    alert(data.message);
    if (data.error != true) {
      //redirect to login screen after successful registration
      navigation.navigate("Login");
    }
  }
  return (
    <View>
      <ImageBackground
        source={require("../assets/images/register.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <TextInput
              left={<TextInput.Icon name="email" color="#FEFFFE" size="20" />}
              style={styles.emailInput}
              onChangeText={setInputUserEmail}
              value={inputUserEmail}
              placeholder="Email"
              placeholderTextColor="white"
              theme={{ colors: { text: "white" } }}
            />

            <TextInput
              left={<TextInput.Icon name="key" color="#FEFFFE" size="20" />}
              style={styles.pwInput}
              onChangeText={setInputUserPassword}
              value={inputUserPassword}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="white"
              theme={{ colors: { text: "white" } }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity onPress={register} style={styles.btn}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "HelveticaNeue-Bold",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    color: "black",
  },
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
