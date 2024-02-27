import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import AppView from "@/appLayouts/AppView";

import { categories, Category } from "../../context/types/category.type";

import { TextMid } from "../../utils/text/Text";

import { secondaryTextLight } from "../../utils/styles";

// TODO: We'll probably need to move the state out to use the category selected to query the products

export default function CategoryList() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <AppView
      width100
      flexRowCenter
      gap={20}
      paddingTop={5}
      backgroundColorPurple>
      {categories.map((category) => (
        <CategoryC
          key={category.id}
          category={category}
          isSelected={selectedCategory.id === category.id}
          onSelect={() => setSelectedCategory(category)}
        />
      ))}
    </AppView>
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
        borderBottomColor: isSelected ? "white" : "transparent",
        borderBottomWidth: isSelected ? 1.5 : 0,
      }}
      onPress={onSelect}>
      <TextMid
        bold={isSelected}
        style={{
          lineHeight: 40,
          color: isSelected ? "white" : secondaryTextLight,
        }}>
        {category.label}
      </TextMid>
    </TouchableOpacity>
  );
}