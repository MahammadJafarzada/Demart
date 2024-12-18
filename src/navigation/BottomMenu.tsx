import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import tw from "twrnc";
import Home from "../layout/Home/Home";
import Basket from "../layout/Basket/Basket";
import Wishlist from "../layout/Wishlist/Wishlist";

const Tab = createBottomTabNavigator();

export default function BottomMenu() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Basket") {
            iconName = focused ? "cart" : "cart-outline"; 
          } else if (route.name === "Wishlist") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return (
            <View style={tw`items-center justify-center`}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: "#000787",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 8, height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Basket" component={Basket} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
    </Tab.Navigator>
  );
}
