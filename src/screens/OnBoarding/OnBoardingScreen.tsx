import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import { setItem } from "../../utils/asyncStorage";

const OnBoardingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDone = () => {
    navigation.navigate('Login');
    setItem('onboarded', '1')
  };

  const DoneButton = ({ ...props }) => {
    return (
      <TouchableOpacity 
        style={tw`p-3 bg-blue-500 rounded-full items-center`} 
        {...props}>
        <Text style={tw`text-white text-lg font-bold`}>Done</Text>
      </TouchableOpacity>
    );
  };

  const SkipButton = ({ ...props }) => {
    return (
      <TouchableOpacity 
        style={tw`p-3 bg-gray-300 rounded-full items-center`} 
        {...props}>
        <Text style={tw`text-black text-lg`}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const NextButton = ({ ...props }) => {
    return (
      <TouchableOpacity 
        style={tw`p-3 bg-blue-500 rounded-full items-center`} 
        {...props}>
        <Text style={tw`text-white text-lg`}>Next</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Onboarding
        onSkip={handleDone}
        onDone={handleDone}
        DoneButtonComponent={DoneButton}
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        bottomBarHighlight = {false}
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding1.png")} style={tw`w-60 h-60`} />,
            title: "Choose Products",
            subtitle: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding2.png")} style={tw`w-60 h-60`} />,
            title: "Make Payment",
            subtitle: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding3.png")} style={tw`w-60 h-60`} />,
            title: "Get Your Order",
            subtitle: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
