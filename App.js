import * as React from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StocksProvider } from "./contexts/StocksContext";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  const MyTheme = {
    dark: false,
    colors: {
      primary: "rgb(30, 39, 65)",
      background: "rgb(242, 242, 242,0)",
      card: "rgb(255, 255, 255)",
      text: "rgb(31, 36, 53)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(236, 67, 87)",
    },
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/BGIMG.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StocksProvider>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer theme={MyTheme}>
            <MainNavigator />
          </NavigationContainer>
        </StocksProvider>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
