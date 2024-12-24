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
    setItem('onboarded', '1');
  };

  const Button = ({ text, style, ...props }) => (
    <TouchableOpacity style={[tw`p-3 items-center`, style]} {...props}>
      <Text style={tw`text-lg font-bold ${style}`}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Onboarding
        onSkip={handleDone}
        onDone={handleDone}
        DoneButtonComponent={(props) => <Button text="Done" style="text-[#f00]" {...props} />}
        NextButtonComponent={(props) => <Button text="Next" style="text-[#f00]" {...props} />}
        SkipButtonComponent={(props) => <Button text="Skip" style="text-[#C4C4C4]" {...props} />}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding1.png")} style={tw`w-60 h-60`} />,
            title: <Text style={tw`text-xl font-bold text-center text-gray-800`}>Choose Products</Text>,
            subtitle: <Text style={tw`text-base text-center text-gray-500 mt-2 px-6`}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</Text>,
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding2.png")} style={tw`w-60 h-60`} />,
            title: <Text style={tw`text-xl font-bold text-center text-gray-800`}>Make Payment</Text>,
            subtitle: <Text style={tw`text-base text-center text-gray-500 mt-2 px-6`}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</Text>,
          },
          {
            backgroundColor: "#fff",
            image: <Image source={require("../../../assets/onboarding3.png")} style={tw`w-60 h-60`} />,
            title: <Text style={tw`text-xl font-bold text-center text-gray-800`}>Get Your Order</Text>,
            subtitle: <Text style={tw`text-base text-center text-gray-500 mt-2 px-6`}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</Text>,
          }
        ]}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
