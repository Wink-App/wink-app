import { useRouter } from "expo-router";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";

import { sections } from "../../../context/types/section.type";

import { ButtonText } from "../../../components/elements/Button";
import CategoryList from "../../../components/home/CategoryList";
import SectionC from "../../../components/home/SectionC";
import { TextMid, TextSmall } from "../../../utils/text/Text";

import { stylesBase } from "../../../utils/styles";

export default function Home() {
  const {
    container,
    scroll,
  } = styles;

  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const handlePress = () => {
    router.push("/main/home/location");
  };
  return (
    <SafeAreaLayout>
      <View style={container}>
        <Image
          source={require("../../../assets/logos/WinkLogo2.png")}
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
            ...scroll,
            paddingBottom: tabBarHeight + 20,
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
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    ...stylesBase.flexColumnCenter,
    marginTop: 20,
    gap: 20,
  },
  scroll: {
    ...stylesBase.flexColumnStartLeft,
    gap: 20,
  },
});