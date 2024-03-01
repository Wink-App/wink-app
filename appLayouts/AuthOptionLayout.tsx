import AppView from "../components/app/AppView";
import { FullLineButtonBack } from "../components/elements/Button";
import { AvoidKeyboard, DismissKeyboard } from "../components/transitions/Keyboard";
import AppText from "@/components/app/AppText";
import { windowHeight } from "../utils/utils";

import { colorGreyBackground } from "../utils/styles";

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
          <AppView height100 flexColumnSpaceBetCenter paddingHorizontal={30}>
            <AppView width100 flexColumnStartLeft gap={windowHeight * 0.065}>
              <FullLineButtonBack
                style={{ marginTop: 20 }}
              />
              <AppView width100 flexColumnStartLeft gap={15}>
                <AppText bold altFontSize={22} lineHeight={33}>{title}</AppText>
                <AppText mid secondary lineHeight={21} marginTop={-10}>{subTitle}</AppText>
                {children}
              </AppView>
            </AppView>
            {Button}
          </AppView>
        </DismissKeyboard>
      </SafeAreaLayout>
    </AvoidKeyboard>
  );
}