import { Pressable, StyleSheet } from "react-native";

import { secondaryTextLight, stylesBase } from "@/utils/styles";

import ExpoSvg from "../elements/ExpoSvg";

type ButtonAddFavProps = {
  isFav: boolean;
  handleAddFav: () => void;
};

export default function ButtonAddFav({ isFav, handleAddFav }: ButtonAddFavProps) {
  const { container, fav } = styles;
  const source = isFav
    ? require("@/assets/icons/FavouritesFilled.svg")
    : require("@/assets/icons/Favourites.svg");
  return (
    <Pressable
      onPress={handleAddFav}
      style={container}>
      <ExpoSvg
        source={source}
        style={fav}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 25,
    height: 25,
    ...stylesBase.flexRowCenter,
    backgroundColor: secondaryTextLight,
    borderRadius: 50,
    padding: 10,
  },
  fav: {
    width: 12,
    height: 11,
  },
});