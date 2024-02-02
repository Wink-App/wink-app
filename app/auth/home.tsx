import { useRouter } from "expo-router";

import { Image, StyleSheet, Text, View } from "react-native";

import SafeAreaLayout from "../../appLayouts/SafeAreaLayout";

import { ButtonAuth } from "../../components/elements/Button";
import { windowWidth } from "../../utils/utils";

import { colorPurple, colorWhite, secondaryText, stylesBase, TextUnderlined } from "../../utils/styles";

export default function Home() {

  const {
    wrapper,
    whiteCircle,
    container,
    logo,
    policy,
  } = styles;

  const logoDir = require("../../assets/logos/WinkLogo1.png");

  const router = useRouter();

  const handleEmailAuth = () => {
    router.push("/auth/(email)/email");
  };

  const handlePhoneAuth = () => {
    router.push("/auth/(phone)/phone");
  };

  const bodyCopy = "Continuando, accetti automaticamente i nostri\n";

  return (
    <View style={wrapper}>
      <View style={whiteCircle}>
        <SafeAreaLayout>
          <View style={container}>
            <Image
              source={logoDir}
              style={logo}
            />
            <ButtonAuth
              authProvider="google"
              onPress={() => { }}
            />
            <ButtonAuth
              authProvider="apple"
              onPress={() => { }}
            />
            <ButtonAuth
              authProvider="facebook"
              onPress={() => { }}
            />
            <ButtonAuth
              authProvider="email"
              onPress={handleEmailAuth}
            />
            <ButtonAuth
              authProvider="phone"
              onPress={handlePhoneAuth}
            />
            <Text style={policy}>
              {bodyCopy}
              <TextUnderlined>Termini e Condizioni</TextUnderlined>,&nbsp;
              <TextUnderlined>Privacy Policy</TextUnderlined>&nbsp;e&nbsp;
              <TextUnderlined>Cookie Policy</TextUnderlined>.
            </Text>
          </View>
        </SafeAreaLayout>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: colorPurple,
    ...stylesBase.flexColumnEndCenter,
  },
  whiteCircle: {
    width: windowWidth * 1.5,
    height: "82%",
    backgroundColor: colorWhite,
    borderTopLeftRadius: windowWidth * 1.5 / 2,
    borderTopRightRadius: windowWidth * 1.5 / 2,
    ...stylesBase.flexColumnCenter,
  },
  container: {
    height: "100%",
    ...stylesBase.flexColumnStartCenter,
    gap: 20,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 5,
    marginTop: 30,
  },
  policy: {
    ...stylesBase.fontRegular,
    color: secondaryText,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
});
