import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart } from "../../redux/reducers/cartSlice";
import { Product } from "../../utils/ProductType";

const Basket = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const renderCartItem = ({ item }: { item: Product }) => (
    <View
      style={tw`flex-1 justify-around bg-gray-100 rounded-lg shadow-md p-4 mb-4`}
    >
      <Image
        style={[tw`h-40 rounded-lg mb-4 self-center`, { width: "100%" }]}
        source={{ uri: item.images[0] }}
      />
      <View style={tw`items-center mb-4`}>
        <Text style={tw`text-lg font-bold text-gray-800`}>{item.title}</Text>
        <Text style={tw`text-lg text-green-600 font-semibold`}>
          ${item.price}
        </Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Your Basket</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()} 
      />
    </SafeAreaView>
  );
};

export default Basket;