import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducers/cartSlice";
import { Product } from "../utils/ProductType";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../redux/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/reducers/wishlistSlice";

interface ProductCartProps {
  product: Product;
  showQuantity?: boolean;
  showHeart?: boolean;
  showRemoveFromCart: boolean;
  showAddToCart: boolean;
}

const ProductCart: React.FC<ProductCartProps> = ({
  product,
  showQuantity = false,
  showHeart = false,
  showRemoveFromCart = false,
  showAddToCart = false,
}) => {
  const dispatch = useDispatch();
  const handleToWishlist = (product: Product) => {
    const isWishlisted = wishlist.find((item) => item.id === product.id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <View style={tw`flex-1 bg-gray-100 rounded-lg shadow-md p-4 mb-4`}>
      <Image
        style={[tw`h-40 rounded-lg  self-center`, { width: "100%" }]}
        source={{ uri: `${product.images[0]}` }}
      />
      {showHeart && (
        <TouchableOpacity
          onPress={() => handleToWishlist(product)}
          style={[
            tw`absolute top-2 right-2 p-2 rounded-full bg-white`,
            { elevation: 5 },
          ]}
        >
          <Ionicons
            name={
              wishlist.find((wishlistItem) => wishlistItem.id === product.id)
                ? "heart"
                : "heart-outline"
            }
            size={24}
            color="red"
          />
        </TouchableOpacity>
      )}
      <View style={tw`items-center mb-4`}>
        <Text style={tw`text-lg font-bold text-gray-800`}>{product.title}</Text>
        <Text style={tw`text-lg text-green-600 font-semibold`}>
          ${product.price}
        </Text>
        {showQuantity && (
          <Text style={tw`text-sm text-gray-500`}>
            Quantity: {product.quantity}
          </Text>
        )}
      </View>
      {showAddToCart && (
        <TouchableOpacity
          style={tw`bg-blue-500 px-6 py-3 rounded-lg`}
          onPress={() => handleAddToCart(product)}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      )}
      {showRemoveFromCart && (
        <TouchableOpacity onPress={() => dispatch(removeFromCart(product.id))}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCart;
