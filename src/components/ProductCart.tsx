import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/reducers/cartSlice";
import { Product } from "../utils/ProductType";

interface ProductCartProps {
  product: Product;
}

const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <View style={tw`bg-gray-100 rounded-lg shadow-md p-4 mb-4`}>
      <Image
        style={[tw`h-40 rounded-lg mb-4 self-center`, { width: "100%" }]}
        source={{ uri: product.images[0] }}
      />
      <View style={tw`items-center mb-4`}>
        <Text style={tw`text-lg font-bold text-gray-800`}>{product.title}</Text>
        <Text style={tw`text-lg text-green-600 font-semibold`}>
          ${product.price}
        </Text>
        <Text style={tw`text-sm text-gray-500`}>
          Quantity: {product.quantity}
        </Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeFromCart(product.id))}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCart;
