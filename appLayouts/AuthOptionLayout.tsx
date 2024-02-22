import { StyleSheet, Text, View } from "react-native";

import { FullLineButtonBack } from "../components/elements/Button";
import { AvoidKeyboard, DismissKeyboard } from "../components/transitions/Keyboard";
import { TextMid } from "../utils/text/Text";
import { windowHeight } from "../utils/utils";

import { colorBlack, colorGreyBackground, stylesBase } from "../utils/styles";

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
                gap: windowHeight * 0.065,
              }}>
              <FullLineButtonBack
                style={{ marginTop: 20 }}
              />
              <View
                style={{
                  width: "100%",
                  ...stylesBase.flexColumnStartLeft,
                  gap: 15,
                }}>
                <Text style={styles.title}>{title}</Text>
                <TextMid secondary style={styles.subTitle}>{subTitle}</TextMid>
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
    lineHeight: 21,
    marginTop: -10,
  },
});