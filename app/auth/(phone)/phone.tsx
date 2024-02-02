import { useRouter } from "expo-router";

import { View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import { useProfile } from "../../../context/user";
import { useNumber } from "../../../context/hooks/inputs";

import { ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

import { stylesBase } from "../../../utils/styles";

export default function Phone() {

  const router = useRouter();
  const { getIsNewUserFromPhone } = useProfile();

  const [phoneNumber, setPhoneNumber, isValid, isInvalidChar] = useNumber("", 10);
  const subTitle = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const handleContinue = async () => {
    await getIsNewUserFromPhone({ phone: phoneNumber });
    router.push("/auth/(phone)/code");
  };

  return (
    <AuthOptionLayout
      title="Inserisci il tuo numero"
      subTitle={subTitle}>
      <InputLabel
        value={phoneNumber}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci il tuo numero"
        isPhoneNumber
        inputmode="number-pad"
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
    </AuthOptionLayout>
  );
}
