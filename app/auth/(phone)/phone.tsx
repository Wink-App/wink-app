import { useRouter } from "expo-router";

import { StyleSheet, Text, View } from "react-native";

import { usePhoneNumber } from "../../../context/hooks/inputs";

import { ButtonBack, ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";
import DismissKeyboard from "../../../components/transitions/DismissKeyboard";

import { colorBlack, colorGreyBackground, secondaryText, stylesBase } from "../../../utils/styles";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";
import { windowHeight, windowWidth } from "../../../utils/utils";

export default function Phone() {

  const {
    wrapper,
    backButton,
    container,
    title,
    subTitle,
  } = styles;

  const bodyCopy = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const [phoneNumber, setPhoneNumber, isValid] = usePhoneNumber("");

  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth/(phone)/code");
  };

  return (
    <View style={wrapper}>
      <SafeAreaLayout>
        <View style={backButton}>
          <ButtonBack />
        </View>
        <DismissKeyboard>
          <View style={container}>
            <Text style={title}>Inserisci il tuo numero</Text>
            <Text style={subTitle}>{bodyCopy}</Text>
            <InputLabel
              value={phoneNumber}
              placeholder="Inserisci il tuo numero"
              isPhoneNumber
              inputmode="phone-pad"
              autoFocus
              onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
              clearFunction={() => setPhoneNumber("")}
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
