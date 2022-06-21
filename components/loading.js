import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";

export function GetLoadingPage() {
  return (
    <View>
      <ImageBackground
        source={require("../assets/images/loading.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontFamily: "HelveticaNeue-Bold",
              fontSize: 30,
              color: "white",
              textAlign: "center",
            }}
          >
            Loading....
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
export function GetLoadingText() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/images/loading2.png")}
        style={{ width: "50%", height: "50%" }}
      ></Image>
      <Text style={{ fontSize: 20 }}>Loading....</Text>
    </View>
  );
}
