import { useRouter } from "expo-router";

import { View } from "react-native";

import AppView from "@/appLayouts/AppView";

import { Section } from "../../context/types/section.type";

import { TextBig, TextMid } from "../../utils/text/Text";

import { stylesBase } from "../../utils/styles";

import { useHome } from "../../app/main/tabs/home/_layout";
import { ButtonText } from "../elements/Button";
import ExpoSvg from "../elements/ExpoSvg";
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
          <ProductC key={product.id} product={product} view="Home" />
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
    <AppView windowWidth flexRowSpaceBetCenter>
      <TextBig style={sectionLabel}>
        {children}
      </TextBig>
      <ButtonText
        onPress={onPress}
        style={{
          paddingRight: 20,
          marginBottom: -1.25,
          ...stylesBase.flexRowCenter,
          gap: 3,
        }}>
        <TextMid secondary style={seeAll}>
          Vedi tutto
        </TextMid>
        <ExpoSvg
          source={require("@/assets/icons/ArrowRightSecondary.svg")}
          size={6}
          style={{ marginTop: 2 }}
        />
      </ButtonText>
    </AppView>
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