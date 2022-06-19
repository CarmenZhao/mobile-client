import * as React from "react";
import { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { StocksProvider, useStocksContext } from "./contexts/StocksContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainNavigator from "./navigation/MainNavigator";

import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [initialRoute, setInitialRoute] = useState();
  //const { isLoggedIn } = useStocksContext();
  // let _retrieveToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("token");
  //     if (value == undefined || value == null) {
  //       console.log(value);
  //       setIsLoggedIn(false);

  //       console.log("visitor");
  //     } else {
  //       setIsLoggedIn(true);

  //       console.log(value);
  //       console.log("user");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // TODO IMPORTANT DO STH WITH ERROR ,display warning msg
  //   }
  // };

  // const clearAppData = async function () {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     await AsyncStorage.multiRemove(keys);
  //     console.log("clear storage");
  //   } catch (error) {
  //     console.error("Error clearing app data.");
  //   }
  // };

  // useEffect(() => {
  //   // FixMe: Retrieve watchlist from persistent storage
  //   //clearAppData();
  //   _retrieveToken();
  // }, []);

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
          {/* <NavigationContainer theme={MyTheme}>
            {isLoggedIn ? (
              <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                  name="Home"
                  component={BottomTabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen} //options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen} //options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                  name="Home"
                  component={BottomTabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen} //options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen} //options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer> */}
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

// return (
//   <Stack.Navigator>
//     {state.userToken == null ? (
//       // No token found, user isn't signed in
//       <Stack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={{
//           title: "Sign in",
//           // When logging out, a pop animation feels intuitive
//           // You can remove this if you want the default 'push' animation
//           animationTypeForReplace: state.isSignout ? "pop" : "push",
//         }}
//       />
//     ) : (
//       // User is signed in
//       <Stack.Screen name="Home" component={HomeScreen} />
//     )}
//   </Stack.Navigator>
// );
