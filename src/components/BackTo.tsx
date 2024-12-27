import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

type BackToProps = {
  label?: string; 
};

const BackTo: React.FC<BackToProps> = ({ label }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (  
    <Pressable
      onPress={() => navigation.goBack()}
      style={tw`flex-row px-1 py-2 my-2 mx-2 bg-white items-center`}
    >
      <Image
        source={require("../../assets/back.png")}
        resizeMode="contain"
        style={tw`h-6 w-6 tint-black`}
      />
      {label && (
        <Text style={tw`text-black text-lg font-bold px-2`}>{label}</Text>
      )}
    </Pressable>
  );
};

export default BackTo;
