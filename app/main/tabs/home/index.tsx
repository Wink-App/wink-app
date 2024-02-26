import { useRouter } from "expo-router";

import { Image, StyleSheet, View } from "react-native";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { sections } from "@/context/types/section.type";

import { ButtonText } from "@/components/elements/Button";
import CategoryList from "@/components/home/CategoryList";
import SectionC from "@/components/home/SectionC";
import { ExpoScrollView } from "@/components/wrappers/Scroll";
import { TextMid, TextSmall } from "@/utils/text/Text";

import { colorGreyBackground, colorPurple, stylesBase } from "@/utils/styles";

export default function Home() {
  const { wrapper, container } = styles;

  const router = useRouter();

  const handlePress = () => {
    router.push("/main/tabs/home/location");
  };
  return (
    <View style={wrapper}>
      <ViewAppLayout
        center
        padding={false}
        tabBarPadding
        style={container}>
        <View
          style={{
            width: "100%",
            ...stylesBase.flexColumnCenter,
            gap: 20,
          }}>
          <Image
            source={require("@/assets/logos/WinkLogo2.png")}
            style={{ height: 35, objectFit: "contain" }}
          />
          <ButtonText
            onPress={handlePress}>
            <TextMid bold white>
              Via Venti Settembre, 32
              <TextSmall bold white> {">"}</TextSmall>
            </TextMid>
          </ButtonText>
        </View>
        <ExpoScrollView
          style={{ backgroundColor: colorGreyBackground }}>
          <CategoryList />
          <View
            style={{
              width: "100%",
              ...stylesBase.flexColumnStartLeft,
              gap: 20,
            }}>
            {sections.map((section) => (
              <SectionC key={section.id} section={section} />
            ))}
          </View>
        </ExpoScrollView>
      </ViewAppLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colorPurple,
  },
  container: {
    backgroundColor: colorPurple,
  },
});