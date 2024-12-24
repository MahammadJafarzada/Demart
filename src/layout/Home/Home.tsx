import React, { useState, useEffect, memo, useRef } from "react";
import {
  View,
  Keyboard,
  FlatList,
  Animated,
} from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, products } from "../../utils/ProductsAPI";
import { Product } from "../../utils/ProductType";
import SearchInput from "../../components/SearchInput";
import CategoryList from "../../components/CategoryList";
import ProductCart from "../../components/ProductCart";
import Banner from "../../components/Banner";
import Pagination from "../../components/Pagination";
import banner1 from "../../../assets/banner.png";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  
  const banners = [
    {
      id: 1,
      image: banner1,
      title: "Discount Sale",
      subtitle: "Now in (product)",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      image: banner1,
      title: "Discount Sale",
      subtitle: "Now in (product)",
      buttonText: "Shop Now",
    },
    {
      id: 3,
      image: banner1,
      title: "Discount Sale",
      subtitle: "Now in (product)",
      buttonText: "Shop Now",
    },
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
          <Banner
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            buttonText={item.buttonText}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
      />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4`}>
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
        columnWrapperStyle={tw`justify-between`}
      />
    </SafeAreaView>
  );
};

export default memo(Home);
