import { Image, StyleSheet, View } from "react-native";

import { Product } from "../../context/types/product.type";

import { TextMid, TextSmall } from "../../utils/text/Text";

import { stylesBase } from "../../utils/styles";

import { ButtonText } from "../elements/Button";
import Price from "./Price";

type ProductCProps = {
  product: Product;
};

export default function ProductC({ product }: ProductCProps) {
  const { container, image, info } = styles;

  const handlePress = () => {
    // TODO
  };
  return (
    <View style={container}>
      <Image
        source={{ uri: product.image }}
        style={image}
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
    width: 150,
    height: 275,
    ...stylesBase.flexColumnStartLeft,
    gap: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
  image: {
    width: "100%",
    height: 175,
    objectFit: "cover",
    borderRadius: 5,
  },
  info: {
    ...stylesBase.flexColumnStartLeft,
  },
});