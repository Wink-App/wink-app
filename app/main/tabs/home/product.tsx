import { useState } from "react";
import { Image, StyleSheet } from "react-native";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { useProfile } from "@/context/user";

import AppText from "@/components/app/AppText";
import AppView from "@/components/app/AppView";
import { ButtonPrimary } from "@/components/elements/Button";
import { HeaderBackElements } from "@/components/elements/HeaderBackElements";
import Price from "@/components/product/Price";
import { ModalBottomHalf } from "@/components/wrappers/ExpoModal";
import { ExpoScrollView } from "@/components/wrappers/Scroll";

export default function Product() {
  const { image } = styles;

  const { selectedProduct } = useProfile();

  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);

  return (
    <ViewAppLayout
      padding={false}
      tabBarPadding>
      <HeaderBackElements center padding>
        <AppText big>{selectedProduct.name}</AppText>
      </HeaderBackElements>
      <ExpoScrollView gap={20}>
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
            <AppText mid>{selectedProduct.category}&nbsp;&nbsp;-&nbsp;&nbsp;{selectedProduct.storeName}</AppText>
            <AppText big bold>{selectedProduct.name}</AppText>
            <AppText big><Price>{selectedProduct.price}</Price></AppText>
          </AppView>

          <AppView flexColumnStartLeft gap={5}>
            <AppText mid secondary>Tempo di consegna stimato:</AppText>
            <AppText mid>{selectedProduct.time}</AppText>
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
          <AppText big>Seleziona la taglia</AppText>
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
      <AppText mid>{size}</AppText>
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