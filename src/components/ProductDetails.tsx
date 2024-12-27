import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Product } from "../utils/ProductType";
import BackTo from "./BackTo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../redux/store";
import { addToWishlist, removeFromWishlist } from "../redux/reducers/wishlistSlice";

type ProductDetailsRouteProp = RouteProp<
  { ProductDetails: { product: Product } },
  "ProductDetails"
>;

const ProductDetails = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { product } = route.params;
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);


  const handleToWishlist = (product: Product) => {
    const isWishlisted = wishlist.find((item) => item.id === product.id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <BackTo label="Product" />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`relative`}>
        <Image
          style={[tw`h-64 w-full`, { resizeMode: "cover" }]}
          source={{ uri: product.images[0] }}
        />
        <TouchableOpacity
            onPress={() => handleToWishlist(product)}
            style={tw`absolute top-2 right-2 p-2 rounded-full bg-white`}
          >
              <Ionicons
                name={
                  wishlist.find(
                    (wishlistItem) => wishlistItem.id === product.id
                  )
                    ? "heart"
                    : "heart-outline"
                }
                size={22}
                color="#FF4B6E"
              />
          </TouchableOpacity>
          </View>
        <View style={tw`p-4`}>
          <Text style={tw`text-xl font-bold text-black mb-2`}>
            {product.title}
          </Text>
          <Text style={tw`text-lg text-gray-700 mb-2`}>
            ${product.price.toFixed(2)}
          </Text>
          <Text style={tw`text-sm text-gray-500`}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={tw`absolute bottom-0 left-0 right-0 p-4 bg-white shadow-lg`}>
        <TouchableOpacity
          style={tw`bg-pink-500 py-4 rounded-full`}
          activeOpacity={0.9}
          onPress={() => handleAddToCart(product)}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
