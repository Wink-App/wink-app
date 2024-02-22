import { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { categories, Category } from "../../context/types/category.type";

import { TextMid } from "../../utils/text/Text";

import { colorBorderLine, stylesBase } from "../../utils/styles";

// TODO: We'll probably need to move the state out to use the category selected to query the products

export default function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <View
      style={{
        width: "100%",
        ...stylesBase.flexRowStartCenter,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderColor: colorBorderLine,
        gap: 20,
      }}>
      {categories.map((category) => (
        <CategoryC
          key={category.id}
          category={category}
          isSelected={selectedCategory.id === category.id}
          onSelect={() => setSelectedCategory(category)}
        />
      ))}
    </View>
  );
}

type CategoryCProps = {
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
};

function CategoryC({ category, isSelected, onSelect }: CategoryCProps) {
  return (
    <TouchableOpacity
      key={category.id}
      style={{
        borderBottomColor: isSelected ? "black" : "transparent",
        borderBottomWidth: isSelected ? 1 : 0,
      }}
      onPress={onSelect}>
      <TextMid
        style={{
          lineHeight: 40,
          color: isSelected ? "black" : "grey",
        }}>
        {category.label}
      </TextMid>
    </TouchableOpacity>
  );
}