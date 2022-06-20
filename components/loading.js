import React from "react";
import { View, Text, ImageBackground } from "react-native";

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
