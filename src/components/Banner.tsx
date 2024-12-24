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
  onPress?: () => void;
}

const { width } = Dimensions.get("window");

const Banner = ({
  image,
  title,
  subtitle,
  buttonText,
  onPress,
}: BannerProps) => {
  return (
    <View style={tw`m-3 rounded-2xl overflow-hidden shadow-lg`}>
      <ImageBackground
        source={image}
        style={[{ width: width - 24 }, tw`h-48 justify-end`]}
        imageStyle={tw`rounded-2xl`}
        resizeMode="cover"
      >
        <View style={tw`p-6`}>
          <Text style={[tw`text-2xl font-bold text-white mb-2`]}>{title}</Text>
          <Text style={[tw`text-base text-gray-200 mb-6 leading-5`]}>
            {subtitle}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={tw`bg-white py-3 px-6 rounded-full self-start
              shadow-sm active:opacity-90`}
          >
            <Text style={[tw`text-pink-500 font-bold text-base`]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Banner;
