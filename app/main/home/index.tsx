import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";

import { products } from "../../../context/types/product.type";

import CategoryList from "../../../components/home/category";
import ProductC from "../../../components/product/ProductC";
import HorizontalScroll from "../../../components/wrappers/HorizontalScroll";
import { TextBig, TextSmall } from "../../../utils/text/Text";

import { stylesBase } from "../../../utils/styles";

export default function Home() {
  return (
    <SafeAreaLayout>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/logos/WinkLogo2.png")}
          style={{ height: 35, objectFit: "contain" }}
        />
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
              {products.map((product) => (
                <ProductC key={product.id} product={product} />
              ))}
            </HorizontalScroll>
            <SectionLabel>Saldi</SectionLabel>
            <HorizontalScroll>
              {products.map((product) => (
                <ProductC key={product.id} product={product} />
              ))}
            </HorizontalScroll>
            <SectionLabel>Scarpe</SectionLabel>
            <HorizontalScroll>
              {products.map((product) => (
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
  return (
    <View
      style={{
        ...stylesBase.flexRowCenter,
        gap: 10,
      }}>
      <TextBig style={styles.sectionLabel}>
        {children}
      </TextBig>
      <TextSmall secondary style={{ marginBottom: -3 }}>Vedi tutto</TextSmall>
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
    paddingBottom: 50,
  },
  sectionLabel: {
    paddingLeft: 20,
  },
});