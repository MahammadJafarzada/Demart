import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Keyboard, ScrollView } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { categories, products } from "../../utils/ProductsAPI";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { RootState } from "../../redux/store";
import { addToCart } from "../../redux/reducers/cartSlice";
import { RootStackParamList } from "../../../types";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../utils/ProductType";



const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory,setSelectedCategory ] = useState<number | null>(null)
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== null) {
      filtered = filtered.filter((product) => product.category_id === selectedCategory);
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
       <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`flex-row mb-4`}
        contentContainerStyle={tw`space-x-4`}
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory(null)}
          style={tw`px-4 py-2 rounded-full ${
            selectedCategory === null ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <Text style={tw`text-sm ${selectedCategory === null ? "text-white" : "text-black"}`}>
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={tw`px-4 py-2 rounded-full ${
              selectedCategory === category.id ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            <Text
              style={tw`text-sm ${
                selectedCategory === category.id ? "text-white" : "text-black"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={tw`flex-1 justify-around bg-gray-100 rounded-lg shadow-md p-4 mb-4`}
          >
            <View>
              <Image
                style={[tw`h-40 rounded-lg mb-4 self-center`, { width: "100%" }]}
                source={{ uri: `${item.images[0]}` }}
              />
              <TouchableOpacity
                style={[
                  tw`absolute top-2 right-2 p-2 rounded-full bg-white`,
                  { elevation: 5 }, 
                ]}
              >
                <Ionicons name="heart-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <View style={tw`items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>{item.title}</Text>
              <Text style={tw`text-lg text-green-600 font-semibold`}>
                ${item.price}
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-blue-500 px-6 py-3 rounded-lg`}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={tw`pb-20`}
        columnWrapperStyle={tw`justify-between`}
      />
      <View style={tw`flex-row justify-center items-center py-4`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Basket")}
          style={tw`bg-red-500 rounded-full px-6 py-3`}
        >
          <Text style={tw`text-white font-bold`}>Basket: {cart.length}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
