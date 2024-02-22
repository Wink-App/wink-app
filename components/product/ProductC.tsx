import { Image, StyleSheet, View } from "react-native";

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
  const { container, image, info } = styles;

  const handlePress = () => {
    // TODO
  };

  return (
    <View
      style={{
        ...container,
        width: size[view].width,
      }}>
      <ButtonAddFav />
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
        <ButtonText onPress={handlePress}>
          <TextSmall secondary underlined>
            Altro da {product.storeName}
          </TextSmall>
        </ButtonText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    ...stylesBase.flexColumnStartLeft,
    gap: 10,
    // ...stylesBase.redBorder,
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