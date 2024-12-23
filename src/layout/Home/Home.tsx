import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { categories, products } from "../../utils/ProductsAPI";
import SearchInput from "../../components/SearchInput";
import { Product } from "../../utils/ProductType";
import CategoryList from "../../components/CategoryList";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCart from "../../components/ProductCart";
import Banner from "../../components/Banner";
import banner1 from "../../../assets/banner.png"

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const banners = [
    { id: 1, image: banner1, title: "Discount Sale" },
  ];
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
  const ListHeader = () => (
      <View>
        <FlatList
        data={banners}
        renderItem={({ item }) => (
          <Banner image={item.image} title={item.title} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
  );


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
        <FlatList
          data={filteredProducts}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <ProductCart
              product={item}
              showQuantity={false}
              showRemoveFromCart={false}
              showHeart={true}
              showAddToCart={true}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={tw`pb-20`}
          columnWrapperStyle={tw`justify-evenly`}
        />
    </SafeAreaView>
  );
};

export default memo(Home);
