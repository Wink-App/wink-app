import { useRouter } from "expo-router";

import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Section } from "../../context/types/section.type";

import AppView from "@/components/app/AppView";

import { colorGreyDarker, stylesBase } from "../../utils/styles";

import { useHome } from "../../app/main/tabs/home/_layout";
import AppText from "../app/AppText";
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
    <AppView width100 flexColumnStartLeft gap={10}>
      <SectionHeader onPress={handlePress}>{section.name}</SectionHeader>
      <HorizontalScroll
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {section.products.map((product) => (
          <ProductC key={product.id} product={product} view="Home" />
        ))}
      </HorizontalScroll>
    </AppView>
  );
}

type SectionHeaderProps = {
  children: string;
  onPress: () => void;
};

function SectionHeader({ children, onPress }: SectionHeaderProps) {
  return (
    <AppView flexRowCenter gap={10}>
      <AppText big bold lineHeight={40} style={{ paddingLeft: 20 }}>
        {children}
      </AppText>
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          ...stylesBase.flexRowCenter,
          backgroundColor: colorGreyDarker,
          borderRadius: 20,
        }}
        onPress={onPress}>
        <ExpoSvg
          source={require("@/assets/icons/ArrowRightBlack.svg")}
          size={9}
        />
      </TouchableOpacity>
    </AppView>
  );
}