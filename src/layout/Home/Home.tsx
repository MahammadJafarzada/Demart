import React, { useState, useEffect, memo } from "react";
import {
  View,
  Keyboard,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, products } from "../../utils/ProductsAPI";
import { Product } from "../../utils/ProductType";
import SearchInput from "../../components/SearchInput";
import CategoryList from "../../components/CategoryList";
import ProductCart from "../../components/ProductCart";
import Banner from "../../components/Banner";
import { banners } from "../../utils/Banner";
import * as Location from "expo-location";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [address, setAddress] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);

  // Fetch Location and Address
  useEffect(() => {
    const getLocationAndAddress = async () => {
      setLoadingLocation(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});

        const geocode = await Location.reverseGeocodeAsync(location.coords);

        if (geocode.length > 0) {
          const { city, country } = geocode[0];
          const formattedAddress = `${city}, ${country}`;
          setAddress(formattedAddress);
        } else {
          setErrorMsg("Unable to fetch address.");
        }
      } catch (error) {
        setErrorMsg("Failed to fetch location or address.");
      } finally {
        setLoadingLocation(false);
      }
    };

    getLocationAndAddress();
  }, []);

  // Filter products
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

  // Render address or loading/error message
  const renderAddressInfo = () => {
    if (loadingLocation) {
      return <ActivityIndicator size="small" color="#0000ff" />;
    }

    if (errorMsg) {
      return <Text style={tw`text-red-500`}>{errorMsg}</Text>;
    }

    if (address) {
      return (
        <Text style={tw`flex-row items-center text-gray-500 font-bold text-lg`}>
          <EvilIcons name="location" size={24} color="black" />
          {address}
        </Text>
        );
    }

    return <Text>Address not available</Text>;
  };

  // List Header
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
      <View style={tw`flex mb-2`}>{renderAddressInfo()}</View>
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
