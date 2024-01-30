import { useRouter } from "expo-router";

import { StyleSheet, Text, View } from "react-native";

import { usePassword } from "../../../context/hooks/inputs";

import { ButtonBack, ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";
import DismissKeyboard from "../../../components/transitions/DismissKeyboard";

import { colorBlack, colorGreyBackground, secondaryText, stylesBase } from "../../../utils/styles";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";
import { windowHeight, windowWidth } from "../../../utils/utils";

export default function Password() {

  const {
    wrapper,
    backButton,
    container,
    title,
    subTitle,

  } = styles;

  // Bentornato!
  // Usa la tua password per accedere al tuo account.
  // email (bold)

  // Crea una password
  // Scegli una password per il tuo account.
  // email (bold)
  // Almeno 8 caratteri

  const bodyCopy = "Scegli una password per il tuo account.";

  const [password, setPassword, isValid] = usePassword("");

  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth/password");
  };

  return (
    <View style={wrapper}>
      <SafeAreaLayout>
        <View style={backButton}>
          <ButtonBack />
        </View>
        <DismissKeyboard>
          <View style={container}>
            <Text style={title}>Crea una password</Text>
            <Text style={subTitle}>{bodyCopy}</Text>
            <InputLabel
              value={password}
              placeholder="Inserisci password"
              inputmode="default"
              autoFocus
              onChange={(e) => setPassword(e.nativeEvent.text)}
              clearFunction={() => setPassword("")}
            />
            <View
              style={{
                width: "100%",
                ...stylesBase.flexRowCenter,
                marginTop: 5,
              }}>
              <ButtonOrange
                text="Continua"
                onPress={handleContinue}
                enabled={isValid}
              />
            </View>
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
