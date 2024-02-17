import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";

import { products1, products2, products3 } from "../../../context/types/product.type";

import { ButtonText } from "../../../components/elements/Button";
import CategoryList from "../../../components/home/category";
import ProductC from "../../../components/product/ProductC";
import HorizontalScroll from "../../../components/wrappers/HorizontalScroll";
import { TextBig, TextMid, TextSmall } from "../../../utils/text/Text";
import { windowWidth } from "../../../utils/utils";

import { stylesBase } from "../../../utils/styles";

export default function Home() {
  const handlePress = () => {
    // TODO
  };
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/logos/WinkLogo2.png")}
          style={{ height: 35, objectFit: "contain" }}
        />
        <ButtonText
          onPress={handlePress}>
          <TextMid bold>
            Via Venti Settembre, 32
            <TextSmall bold> {">"}</TextSmall>
          </TextMid>
        </ButtonText>
        <ScrollView
          contentContainerStyle={styles.scroll}>
          <CategoryList />
          <View
            style={{
              width: "100%",
              ...stylesBase.flexColumnStartLeft,
              gap: 20,
            }}>
            <SectionLabel>Esplora le novità</SectionLabel>
            <HorizontalScroll>
              {products1.map((product) => (
                <ProductC key={product.id} product={product} />
              ))}
            </HorizontalScroll>
            <SectionLabel>Saldi</SectionLabel>
            <HorizontalScroll>
              {products2.map((product) => (
                <ProductC key={product.id} product={product} />
              ))}
            </HorizontalScroll>
            <SectionLabel>Scarpe</SectionLabel>
            <HorizontalScroll>
              {products3.map((product) => (
                <ProductC key={product.id} product={product} />
              ))}
            </HorizontalScroll>
          </View>
        </ScrollView>
      </View>
    </SafeAreaLayout>
  );
}

function SectionLabel({ children }: { children: string }) {
  const handlePress = () => {
    // TODO
  };
  return (
    <View
      style={{
        width: windowWidth,
        ...stylesBase.flexRowSpaceBetCen,
        gap: 10,
      }}>
      <TextBig style={styles.sectionLabel}>
        {children}
      </TextBig>
      <ButtonText
        onPress={handlePress}
        style={{
          paddingRight: 20,
          marginBottom: -1.25,
          ...stylesBase.flexRowCenter
        }}>
        <TextMid secondary style={styles.seeAll}>
          Vedi tutto
          <TextSmall secondary> {">"}</TextSmall>
        </TextMid>
      </ButtonText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...stylesBase.flexColumnCenter,
    marginTop: 20,
    gap: 20,
  },
  scroll: {
    ...stylesBase.flexColumnStartLeft,
    gap: 20,
    paddingBottom: 110,
  },
  sectionLabel: {
    lineHeight: 24,
    paddingLeft: 20,
  },
  seeAll: {
    lineHeight: 24,
  },
});