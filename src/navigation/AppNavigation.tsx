import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login/Login";
import { RootStackParamList } from "../../types";
import Register from "../screens/Register/Register";
import Home from "../layout/Home/Home";
import Basket from "../layout/Basket/Basket";
import ProductDetails from "../components/ProductDetails";
import BottomMenu from "./BottomMenu";
import Wishlist from "../layout/Wishlist/Wishlist";

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
