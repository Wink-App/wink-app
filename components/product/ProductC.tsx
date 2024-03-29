import { useRouter } from "expo-router";

import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { useProfile } from "@/context/user";
import { Product } from "../../context/types/product.type";

import { stylesBase } from "../../utils/styles";

import AppText from "../app/AppText";
import { ButtonText } from "../elements/Button";
import ButtonAddFav from "./ButtonAddFav";
import Price from "./Price";

type CurrentView = "Home" | "Section";

type ProductCProps = {
  product: Product;
  view: CurrentView;
};

const itemHomeHeight = 275;
const itemSectionHeight = 300;

const size: Record<CurrentView, any> = {
  Home: {
    width: 150,
    height: itemHomeHeight,
    imageHeight: itemHomeHeight - 100,
  },
  Section: {
    width: "47.5%",
    height: itemSectionHeight,
    imageHeight: itemSectionHeight - 100,
  },
};

export default function ProductC({ product, view }: ProductCProps) {
  const { container, body, image } = styles;

  const router = useRouter();
  const { setSelectedProduct } = useProfile();

  const [isFav, setIsFav] = useState<boolean>(false);

  const handleAddFav = () => {
    setIsFav(!isFav);
  };

  const handlePressIn = () => {
    setSelectedProduct(product);
  };
  const handlePress = () => {
    router.push("/main/tabs/home/product");
  };

  const handlePressStore = () => {
    // TODO
  };

  return (
    <View
      style={{
        ...container,
        width: size[view].width,
      }}>
      <ButtonAddFav isFav={isFav} handleAddFav={handleAddFav} />
      <Pressable
        onPressIn={handlePressIn}
        onPress={handlePress}
        style={body}>
        <Image
          source={{ uri: product.image }}
          style={{
            ...image,
            height: size[view].imageHeight,
          }}
        />
        <View style={stylesBase.flexColumnStartLeft}>
          <AppText mid bold>{product.name}</AppText>
          <AppText mid><Price>{product.price}</Price></AppText>
          <AppText small secondary>{product.time}</AppText>
        </View>
      </Pressable>
      <ButtonText onPress={handlePressStore}>
        <AppText small secondary underlined>
          Altro da {product.storeName}
        </AppText>
      </ButtonText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    ...stylesBase.flexColumnStartLeft,
  },
  body: {
    width: "100%",
    ...stylesBase.flexColumnStartLeft,
    gap: 10,
  },
  image: {
    width: "100%",
    objectFit: "cover",
    borderRadius: 5,
  },
});