import { useRouter } from "expo-router";

import { Image, Pressable, StyleSheet, View } from "react-native";

import { useProfile } from "@/context/user";
import { Product } from "../../context/types/product.type";

import { TextMid, TextSmall } from "../../utils/text/Text";

import { stylesBase } from "../../utils/styles";

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
  const { container, body, image, info } = styles;

  const router = useRouter();
  const { setSelectedProduct } = useProfile();

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
      <ButtonAddFav />
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
        <View style={info}>
          <TextMid bold>{product.name}</TextMid>
          <TextMid><Price>{product.price}</Price></TextMid>
          <TextSmall secondary>{product.time}</TextSmall>
        </View>
      </Pressable>
      <ButtonText onPress={handlePressStore}>
        <TextSmall secondary underlined>
          Altro da {product.storeName}
        </TextSmall>
      </ButtonText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    ...stylesBase.flexColumnStartLeft,
    // ...stylesBase.redBorder,
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
  info: {
    ...stylesBase.flexColumnStartLeft,
  },
});