import { StyleSheet, Text, View } from "react-native";

import { ButtonBack } from "../components/elements/Button";
import DismissKeyboard from "../components/transitions/DismissKeyboard";

import { colorBlack, colorGreyBackground, secondaryText, stylesBase } from "../utils/styles";

import { windowHeight, windowWidth } from "../utils/utils";
import SafeAreaLayout from "./SafeAreaLayout";

type AuthOptionLayoutProps = {
  children: React.ReactNode;
  title: string;
  subTitle: string;
};

export default function AuthOptionLayout({
  children,
  title,
  subTitle,
}: AuthOptionLayoutProps) {

  const {
    wrapper,
    backButton,
    container,
  } = styles;

  return (
    <View style={wrapper}>
      <SafeAreaLayout>
        <View style={backButton}>
          <ButtonBack />
        </View>
        <DismissKeyboard>
          <View style={container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            {children}
          </View>
        </DismissKeyboard>
      </SafeAreaLayout>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: colorGreyBackground,
    zIndex: 1,
  },
  backButton: {
    width: windowWidth,
    ...stylesBase.flexRowStartCenter,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  container: {
    height: "100%",
    ...stylesBase.flexColumnStartLeft,
    paddingTop: windowHeight * 0.1,
    paddingHorizontal: 30,
    gap: 15,
  },
  title: {
    ...stylesBase.fontPoppinsBold,
    color: colorBlack,
    fontSize: 22,
    lineHeight: 33,
  },
  subTitle: {
    ...stylesBase.fontPoppinsRegular,
    color: secondaryText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: -10,
  },
});