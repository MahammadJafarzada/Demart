import React, { useEffect, useState } from "react";
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
import OnBoardingScreen from "../screens/OnBoarding/OnBoardingScreen";
import { getItem } from "../utils/asyncStorage";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";

const AppNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await getItem("onboarded");
    setShowOnboarding(onboarded === "1" ? false : true);
  };

  if (showOnboarding === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName={showOnboarding ? "OnBoardingScreen" : "Login"}
      >
        {showOnboarding && (
          <Stack.Screen
            name="OnBoardingScreen"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
        )}
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
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Main"
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
