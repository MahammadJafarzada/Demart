import React from "react";
import {
  View,
  ImageBackground,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

interface BannerProps {
  image: any;
  title: string;
  subtitle: string;
  buttonText: string;
}

const { width } = Dimensions.get("window");

const Banner = ({ image, title, subtitle, buttonText }: BannerProps) => {
  return (
    <View style={tw`m-2 rounded-lg overflow-hidden`}>
      <ImageBackground
        source={image}
        style={[{ width }, tw`h-40 justify-center px-4`]}
        imageStyle={tw`rounded-lg`}
        resizeMode="cover"
      >
        <Text style={tw`text-xl font-bold text-white mb-2`}>{title}</Text>
        <Text style={tw`text-base text-white mb-4`}>{subtitle}</Text>
        <TouchableOpacity style={tw`bg-white py-2 px-4 rounded-lg self-start`}>
          <Text style={tw`text-pink-500 font-bold`}>{buttonText}</Text>
          
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Banner;
