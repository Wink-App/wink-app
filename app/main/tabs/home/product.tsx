import { useState } from "react";
import { Image, StyleSheet } from "react-native";

import AppView from "@/appLayouts/AppView";
import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { useProfile } from "@/context/user";

import { ButtonPrimary } from "@/components/elements/Button";
import { HeaderBackElements } from "@/components/elements/HeaderBackElements";
import Price from "@/components/product/Price";
import { ModalBottomHalf } from "@/components/wrappers/ExpoModal";
import { ExpoScrollView } from "@/components/wrappers/Scroll";
import { TextBig, TextMid } from "@/utils/text/Text";

export default function Product() {
  const { image } = styles;

  const { selectedProduct } = useProfile();

  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);

  return (
    <ViewAppLayout
      padding={false}
      tabBarPadding>
      <HeaderBackElements center padding>
        <TextBig>{selectedProduct.name}</TextBig>
      </HeaderBackElements>
      <ExpoScrollView>
        <Image
          source={{ uri: selectedProduct.image }}
          style={image}
        />
        <AppView
          width100
          flexColumnStartLeft
          gap={20}
          paddingHorizontal={20}>
          <AppView flexColumnStartLeft gap={10} marginTop={10}>
            <TextMid>{selectedProduct.category}&nbsp;&nbsp;-&nbsp;&nbsp;{selectedProduct.storeName}</TextMid>
            <TextBig bold>{selectedProduct.name}</TextBig>
            <TextBig><Price>{selectedProduct.price}</Price></TextBig>
          </AppView>

          <AppView flexColumnStartLeft gap={5}>
            <TextMid secondary>Tempo di consegna stimato:</TextMid>
            <TextMid>{selectedProduct.time}</TextMid>
          </AppView>

          <AppView width100 flexColumnStartLeft gap={5} marginTop={10}>
            <ButtonPrimary
              text="Seleziona taglia"
              fullWidth
              border
              onPress={() => setShowSizeModal(true)}
            />
            <ButtonPrimary
              text="Aggiungi alla borsa"
              fullWidth
              purple
              onPress={() => setShowSizeModal(true)}
            />
          </AppView>
        </AppView>
        <ModalBottomHalf
          isVisible={showSizeModal}
          setIsVisible={setShowSizeModal}>
          <TextBig>Seleziona la taglia</TextBig>
          {selectedProduct.sizes && selectedProduct.sizes.map((size) => (
            <Size key={size} size={size} />
          ))}
        </ModalBottomHalf>
      </ExpoScrollView>
    </ViewAppLayout>
  );
}

function Size({ size }: { size: string }) {
  return (
    <AppView width100 height={30} flexRowStartCenter>
      <TextMid>{size}</TextMid>
    </AppView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
    objectFit: "cover",
  },
});