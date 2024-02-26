import { Pressable, StyleSheet } from "react-native";

import { secondaryTextLight, stylesBase } from "@/utils/styles";

import ExpoSvg from "../elements/ExpoSvg";

export default function ButtonAddFav() {
  const { container, fav } = styles;
  return (
    <Pressable
      style={container}>
      <ExpoSvg
        source={require("@/assets/icons/Favourites.svg")}
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