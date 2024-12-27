import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";

interface ProductCartProps {
  product: Product;
  showQuantity?: boolean;
  showHeart?: boolean;
  showRemoveFromCart: boolean;
  showAddToCart: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

const ProductCart: React.FC<ProductCartProps> = ({
  product,
  showQuantity = false,
  showHeart = false,
  showRemoveFromCart = false,
  showAddToCart = false,
}) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const navigation = useNavigation<any>();


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

  const handleNavigateToDetail = () => {
    navigation.navigate("ProductDetails", { product });
  };
  return (
    <TouchableOpacity
    onPress={handleNavigateToDetail}
      style={tw`flex-0.49 bg-white rounded-3xl shadow-xl mb-4 overflow-hidden`}
    >
      <View style={tw`relative`}>
        <Image
          style={[tw`h-48 w-full`, { resizeMode: "cover" }]}
          source={{ uri: product.images[0] }}
        />
        {showHeart && (
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
        )}
      </View>

      <View style={tw`p-4`}>
        <Text
          style={
            tw`text-base font-bold text-gray-800 mb-1`
           }
          numberOfLines={2}
        >
          {product.title}
        </Text>
        <Text
          style={
            tw`text-base font-bold text-gray-800 mb-1`
           }
          numberOfLines={2}
        >
          {product.description}
        </Text>
        <Text
          style={tw`text-lg text-black font-bold mb-2`}
        >
          ${product.price.toFixed(2)}
        </Text>

        {showQuantity && (
          <View style={tw`flex-row items-center mb-2`}>
            <Text
              style={tw`text-sm text-gray-500`}
            >
              Quantity: {product.quantity}
            </Text>
          </View>
        )}

        <View style={tw`flex-row justify-between items-center`}>
          {showAddToCart && (
            <TouchableOpacity
              style={tw`bg-pink-500 px-4 py-2.5 rounded-full flex-1`}
              onPress={() => handleAddToCart(product)}
              activeOpacity={0.9}
            >
              <Text style={[tw`text-white text-center font-bold text-sm`]}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          )}

          {showRemoveFromCart && (
            <TouchableOpacity
              onPress={() => dispatch(removeFromCart(product.id))}
              style={tw`p-2 bg-red-50 rounded-full`}
              activeOpacity={0.8}
            >
              <AntDesign name="delete" size={20} color="#FF4B6E" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCart;
