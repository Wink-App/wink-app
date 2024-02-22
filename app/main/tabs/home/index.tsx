import { useRouter } from "expo-router";

import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ViewAppLayout from "@/appLayouts/ViewAppLayout";

import { sections } from "@/context/types/section.type";

import { ButtonText } from "@/components/elements/Button";
import CategoryList from "@/components/home/CategoryList";
import SectionC from "@/components/home/SectionC";
import { TextMid, TextSmall } from "@/utils/text/Text";
import { windowWidth } from "@/utils/utils";

import { stylesBase } from "@/utils/styles";

export default function Home() {
  const {
    container,
    scroll,
  } = styles;

  const router = useRouter();

  const handlePress = () => {
    router.push("/main/tabs/home/location");
  };
  return (
    <ViewAppLayout
      center
      padding={false}
      tabBarPadding
      style={container}>
      <Image
        source={require("@/assets/logos/WinkLogo2.png")}
        style={{ height: 35, objectFit: "contain" }}
      />
      <ButtonText
        onPress={handlePress}>
        <TextMid bold>
          Via Venti Settembre, 32
          <TextSmall bold> {">"}</TextSmall>
        </TextMid>
      </ButtonText>
      <ScrollView
        contentContainerStyle={{
          width: windowWidth,
          ...scroll,
          paddingBottom: 30,
        }}>
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
      </ScrollView>
    </ViewAppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  scroll: {
    ...stylesBase.flexColumnStartLeft,
    gap: 20,
  },
});