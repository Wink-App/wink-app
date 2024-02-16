import { Image, StyleSheet, View } from "react-native";

import { Product } from "../../context/types/product.type";

import { TextMid, TextSmall } from "../../utils/text/Text";

import { stylesBase, TextUnderlined } from "../../utils/styles";

import Price from "./Price";

type ProductCProps = {
  product: Product;
};

export default function ProductC({ product }: ProductCProps) {
  const { container, image, info } = styles;
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
        <TextSmall secondary><TextUnderlined>Altro da {product.storeName}</TextUnderlined></TextSmall>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 280,
    ...stylesBase.flexColumnStartLeft,
    gap: 10,
    marginLeft: 20,
    // borderWidth: 1,
    // borderColor: "red",
  },
  image: {
    width: "100%",
    height: 175,
    objectFit: "cover",
  },
  info: {
    ...stylesBase.flexColumnStartLeft,
  },
});