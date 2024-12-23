import React from "react";
import { View, Image, Text } from "react-native";
import tw from "twrnc";

interface BannerProps {
  image: any;
  title: string;
}

const Banner = ({ image, title }: BannerProps) => {
  return (
    <View style={tw`m-2 rounded-lg overflow-hidden`}>
      <Image source={image} style={tw`h-40 w-full rounded-lg`} />
      <Text style={tw`text-lg font-bold p-2 text-center`}>{title}</Text>
    </View>
  );
};

export default Banner;
