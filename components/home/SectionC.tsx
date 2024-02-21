import { useRouter } from "expo-router";

import { View } from "react-native";

import { Section } from "../../context/types/section.type";

import { TextBig, TextMid, TextSmall } from "../../utils/text/Text";
import { windowWidth } from "../../utils/utils";

import { stylesBase } from "../../utils/styles";

import { useHome } from "../../app/main/tabs/home/_layout";
import { ButtonText } from "../elements/Button";
import ProductC from "../product/ProductC";
import { HorizontalScroll } from "../wrappers/Scroll";

export default function SectionC({ section }: { section: Section }) {

  const router = useRouter();
  const { setSelectedSection } = useHome();

  const handlePress = () => {
    setSelectedSection(section);
    router.push("/main/tabs/home/section");
  };

  return (
    <>
      <SectionHeader onPress={handlePress}>{section.name}</SectionHeader>
      <HorizontalScroll
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {section.products.map((product) => (
          <ProductC key={product.id} product={product} />
        ))}
      </HorizontalScroll>
    </>
  );
}

type SectionHeaderProps = {
  children: string;
  onPress: () => void;
};

function SectionHeader({ children, onPress }: SectionHeaderProps) {
  const {
    sectionLabel,
    seeAll,
  } = styles;
  return (
    <View
      style={{
        width: windowWidth,
        ...stylesBase.flexRowSpaceBetCen,
      }}>
      <TextBig style={sectionLabel}>
        {children}
      </TextBig>
      <ButtonText
        onPress={onPress}
        style={{
          paddingRight: 20,
          marginBottom: -1.25,
          ...stylesBase.flexRowCenter
        }}>
        <TextMid secondary style={seeAll}>
          Vedi tutto
          <TextSmall secondary> {">"}</TextSmall>
        </TextMid>
      </ButtonText>
    </View>
  );
}

const styles = {
  sectionLabel: {
    lineHeight: 40,
    paddingLeft: 20,
  },
  seeAll: {
    lineHeight: 40,
  },
};