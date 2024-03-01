import { useRouter } from "expo-router";

import { Image, StyleSheet } from "react-native";

import SafeAreaLayout from "../../appLayouts/SafeAreaLayout";

import useFacebookAuth from "../../context/hooks/useFacebookAuth";
import useGoogleAuth from "../../context/hooks/useGoogleAuth";

import { ButtonAuth } from "../../components/elements/Button";
import AppText from "@/components/app/AppText";
import AppView from "@/components/app/AppView";
import { windowWidth } from "../../utils/utils";

import { colorWhite, TextUnderlined } from "../../utils/styles";

export default function Home() {

  const { whiteCircle, logo } = styles;

  const logoDir = require("../../assets/logos/WinkLogo1.png");

  const router = useRouter();

  const { handleGoogleAuth } = useGoogleAuth();

  // TODO: Temprary shortcut to go Home
  const handleAppleAuth = () => {
    router.push("/main/tabs/home/");
  };

  const { handleFacebookAuth } = useFacebookAuth();

  const handleEmailAuth = () => {
    router.push("/auth/(email)/email");
  };

  const handlePhoneAuth = () => {
    router.push("/auth/(phone)/phone");
  };

  const bodyCopy = "Continuando, accetti automaticamente i nostri\n";

  return (
    <AppView height100 flexColumnEndCenter backgroundColorPurple>
      <AppView flexColumnCenter style={whiteCircle}>
        <SafeAreaLayout>
          <AppView height100 flexColumnStartCenter gap={20}>
            <Image
              source={logoDir}
              style={logo}
            />
            <ButtonAuth
              authProvider="google"
              onPress={handleGoogleAuth}
            />
            <ButtonAuth
              authProvider="apple"
              onPress={handleAppleAuth}
            />
            <ButtonAuth
              authProvider="facebook"
              onPress={handleFacebookAuth}
            />
            <ButtonAuth
              authProvider="email"
              onPress={handleEmailAuth}
            />
            <ButtonAuth
              authProvider="phone"
              onPress={handlePhoneAuth}
            />
            <AppText secondary altFontSize={10} marginTop={50} style={{ textAlign: "center" }}>
              {bodyCopy}
              <TextUnderlined>Termini e Condizioni</TextUnderlined>,&nbsp;
              <TextUnderlined>Privacy Policy</TextUnderlined>&nbsp;e&nbsp;
              <TextUnderlined>Cookie Policy</TextUnderlined>.
            </AppText>
          </AppView>
        </SafeAreaLayout>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  whiteCircle: {
    width: windowWidth * 1.5,
    height: "82%",
    backgroundColor: colorWhite,
    borderTopLeftRadius: windowWidth * 1.5 / 2,
    borderTopRightRadius: windowWidth * 1.5 / 2,
  },
  logo: {
    width: 170,
    height: 170,
    marginTop: 30,
    marginBottom: 5,
  },
});