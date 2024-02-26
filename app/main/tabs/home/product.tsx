import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { useProfile } from "@/context/user";

import { ButtonPrimary } from "@/components/elements/Button";
import { HeaderBackElements } from "@/components/elements/HeaderBackElements";
import Price from "@/components/product/Price";
import { ModalBottomHalf } from "@/components/wrappers/ExpoModal";
import { ExpoScrollView } from "@/components/wrappers/Scroll";
import { TextBig, TextMid } from "@/utils/text/Text";

import { stylesBase } from "@/utils/styles";

export default function Section() {
  const { image, container, info } = styles;

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
          style={{
            ...image
          }}
        />
        <View style={container}>
          <View style={info}>
            <TextMid>{selectedProduct.category}&nbsp;&nbsp;-&nbsp;&nbsp;{selectedProduct.storeName}</TextMid>
            <TextBig bold>{selectedProduct.name}</TextBig>
            <TextBig><Price>{selectedProduct.price}</Price></TextBig>
          </View>

          <View style={{ ...stylesBase.flexColumnStartLeft, gap: 5 }}>
            <TextMid secondary>Tempo di consegna stimato:</TextMid>
            <TextMid>{selectedProduct.time}</TextMid>
          </View>

          <View
            style={{
              width: "100%",
              ...stylesBase.flexColumnStartLeft,
              gap: 10,
              marginTop: 10,
            }}>
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
          </View>
        </View>
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
    <View
      style={{
        ...stylesBase.flexRowStartCenter,
        width: "100%",
        height: 30,
      }}>
      <TextMid>{size}</TextMid>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
    objectFit: "cover",
    // borderRadius: 8,
  },
  container: {
    width: "100%",
    ...stylesBase.flexColumnStartLeft,
    paddingHorizontal: 20,
    gap: 20,
  },
  info: {
    ...stylesBase.flexColumnStartLeft,
    marginTop: 10,
    gap: 10,
  },
});