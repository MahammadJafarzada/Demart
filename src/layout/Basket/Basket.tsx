import React from "react";
import { View, Text, FlatList } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProductCart from "../../components/ProductCart";

const Basket = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-gray-500`}>Your basket is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Your Basket</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => <ProductCart product={item} showQuantity={true}  showRemoveFromCart = {true} showHeart = {true} showAddToCart = {false}/>}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </SafeAreaView>
  );
};

export default Basket;
