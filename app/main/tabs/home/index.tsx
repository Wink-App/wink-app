import { useRouter } from "expo-router";

import { Image } from "react-native";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { sections } from "@/context/types/section.type";

import AppText from "@/components/app/AppText";
import AppView from "@/components/app/AppView";
import { ButtonText } from "@/components/elements/Button";
import ExpoSvg from "@/components/elements/ExpoSvg";
import CategoryList from "@/components/home/CategoryList";
import SectionC from "@/components/home/SectionC";
import { ExpoScrollView } from "@/components/wrappers/Scroll";

import { colorGreyBackground, colorPurple, stylesBase } from "@/utils/styles";

export default function Home() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/main/tabs/home/location");
  };
  return (
    <AppView backgroundColorPurple style={{ flex: 1 }}>
      <ViewAppLayout
        center
        padding={false}
        tabBarPadding
        style={{ backgroundColor: colorPurple }}>
        <AppView width100 flexColumnCenter gap={20}>
          <Image
            source={require("@/assets/logos/WinkLogo2.png")}
            style={{ height: 35, objectFit: "contain" }}
          />
          <ButtonText
            onPress={handlePress}
            style={{
              ...stylesBase.flexRowCenter,
              gap: 6,
            }}>
            <AppText mid bold white>Via Venti Settembre, 32</AppText>
            <ExpoSvg
              source={require("@/assets/icons/ArrowDownWhite.svg")}
              size={9}
            />
          </ButtonText>
        </AppView>
        <ExpoScrollView
          gap={20}
          style={{ backgroundColor: colorGreyBackground }}>
          <CategoryList />
          <AppView width100 flexColumnStartLeft gap={30}>
            {sections.map((section) => (
              <SectionC key={section.id} section={section} />
            ))}
          </AppView>
        </ExpoScrollView>
      </ViewAppLayout>
    </AppView>
  );
}