import React from "react";
import { ScrollView, TouchableOpacity, Text, Image, View } from "react-native";
import tw from "twrnc";

interface CategoryFilterProps {
  categories: { id: number; name: string; image: any }[];
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
}

const CategoryList: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`flex-row py-2`}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={category.id || `category-${index}`}
          onPress={() => setSelectedCategory(category.id)}
          style={tw`items-center mx-2`}
        >
          <View
            style={tw`w-20 h-20 rounded-full overflow-hidden ${
              selectedCategory === category.id ? "border-2 border-blue-500" : ""
            }`}
          >
            <Image
              src={category.image?.[0]}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </View>
          <Text
            style={tw`mt-2 text-sm font-semibold ${
              selectedCategory === category.id ? "text-blue-500" : "text-black"
            }`}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryList;
