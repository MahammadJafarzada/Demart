import { View, Text, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
const OnBoardingScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding1.png")} />,
            title: "Choose Products",
            subtitle: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding2.png")} />,
            title: "Make Payment",
            subtitle: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding3.png")} />,
            title: "Get Your Order",
            subtitle: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
