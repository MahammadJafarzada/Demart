import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import tw from 'twrnc';
import ProductCart from '../../components/ProductCart';

const Wishlist = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-gray-500`}>Your wishlist is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Your Wishlist</Text>
      <FlatList
        data={wishlist}
        renderItem={({ item }) => <ProductCart product={item} showQuantity={false} showRemoveFromCart = {false} showHeart = {true} showAddToCart={false}/>}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </SafeAreaView>
  );
};

export default Wishlist;
