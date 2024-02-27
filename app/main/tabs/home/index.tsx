import { useRouter } from "expo-router";

import { Image } from "react-native";

import AppView from "@/appLayouts/AppView";
import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { sections } from "@/context/types/section.type";

import { ButtonText } from "@/components/elements/Button";
import ExpoSvg from "@/components/elements/ExpoSvg";
import CategoryList from "@/components/home/CategoryList";
import SectionC from "@/components/home/SectionC";
import { ExpoScrollView } from "@/components/wrappers/Scroll";
import { TextMid } from "@/utils/text/Text";

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
            <TextMid bold white>
              Via Venti Settembre, 32
            </TextMid>
            <ExpoSvg
              source={require("@/assets/icons/ArrowDownWhite.svg")}
              size={6}
              style={{ marginTop: -0.5 }}
            />
          </ButtonText>
        </AppView>
        <ExpoScrollView
          style={{ backgroundColor: colorGreyBackground }}>
          <CategoryList />
          <AppView width100 flexColumnStartLeft gap={20}>
            {sections.map((section) => (
              <SectionC key={section.id} section={section} />
            ))}
          </AppView>
        </ExpoScrollView>
      </ViewAppLayout>
    </AppView>
  );
}