import { StyleSheet, Text, View } from "react-native";

import { FullLineButtonBack } from "../components/elements/Button";
import { AvoidKeyboard, DismissKeyboard } from "../components/transitions/Keyboard";
import { windowHeight } from "../utils/utils";

import { colorBlack, colorGreyBackground, secondaryText, stylesBase } from "../utils/styles";

import SafeAreaLayout from "./SafeAreaLayout";

type AuthOptionLayoutProps = {
  children: JSX.Element | JSX.Element[];
  title: string;
  subTitle: string;
  Button: JSX.Element | JSX.Element[];
};

export default function AuthOptionLayout({
  children,
  title,
  subTitle,
  Button,
}: AuthOptionLayoutProps) {
  return (
    <AvoidKeyboard style={{ backgroundColor: colorGreyBackground }}>
      <SafeAreaLayout>
        <DismissKeyboard>
          <View
            style={{
              height: "100%",
              ...stylesBase.flexColumnSpaceBetCen,
              paddingHorizontal: 30,
            }}>
            <View
              style={{
                width: "100%",
                ...stylesBase.flexColumnStartLeft,
                gap: windowHeight * 0.1,
              }}>
              <FullLineButtonBack
                style={{
                  marginTop: 20,
                  marginLeft: -10,
                }}
              />
              <View
                style={{
                  width: "100%",
                  ...stylesBase.flexColumnStartLeft,
                  gap: 15,
                }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
                {children}
              </View>
            </View>
            {Button}
          </View>
        </DismissKeyboard>
      </SafeAreaLayout>
    </AvoidKeyboard>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesBase.fontBold,
    color: colorBlack,
    fontSize: 22,
    lineHeight: 33,
  },
  subTitle: {
    ...stylesBase.fontRegular,
    color: secondaryText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: -10,
  },
});