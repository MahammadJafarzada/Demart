import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { categories, products } from "../../utils/ProductsAPI";
import SearchInput from "../../components/SearchInput";
import { RootState } from "../../redux/store";
import { addToCart } from "../../redux/reducers/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../utils/ProductType";
import { RootStackParamList } from "../../../types";
import CategoryList from "../../components/CategoryList";
import { SafeAreaView } from "react-native-safe-area-context";
import { addToWishlist, removeFromWishlist } from "../../redux/reducers/wishlistSlice";
import ProductCart from "../../components/ProductCart";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);



  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-2`}>
      <SearchInput
        search={search}
        setSearch={setSearch}
        clearSearch={() => {
          setSearch("");
          setFilteredProducts(products);
          Keyboard.dismiss();
        }}
      />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCart product={item} showQuantity={false}  showRemoveFromCart = {false} showHeart = {true} showAddToCart = {true}/>}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={tw`pb-20`}
        columnWrapperStyle={tw`justify-evenly`}
      />
    </SafeAreaView>
  );
};

export default Home;
