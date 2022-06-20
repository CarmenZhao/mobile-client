import React, { useContext } from "react";
import { useStocksContext } from "../contexts/StocksContext";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerStyle: { backgroundColor: (255, 255, 255, 0) } }}
      />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  const { isLoggedIn } = useStocksContext();
  return isLoggedIn ? <StackNavigator /> : <AuthNavigator />;
}
