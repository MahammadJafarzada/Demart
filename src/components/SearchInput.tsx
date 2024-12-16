import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch, clearSearch }) => {
  return (
    <View style={tw`border border-gray-300 rounded-lg m-3 h-12 flex-row items-center`}>
      {search.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            clearSearch();  
            Keyboard.dismiss();
          }}
          style={tw`h-full justify-center pl-3`}>
          <Ionicons name="close-circle" size={18} color="#666" />
        </TouchableOpacity>
      )}
      <TextInput
        style={tw`flex-1 h-10 mx-1 rounded-lg pl-3 text-gray-800`}
        placeholder="Axtarış..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#999"
      />
      <Ionicons name="search" size={18} color="#666" style={tw`mr-3`} />
    </View>
  );
};

export default SearchInput;