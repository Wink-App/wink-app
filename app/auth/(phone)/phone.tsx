import { useRouter } from "expo-router";

import { View } from "react-native";

import { useNumber } from "../../../context/hooks/inputs";
import { useProfile } from "../../../context/user";

import { ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

import { stylesBase } from "../../../utils/styles";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

export default function Phone() {

  const router = useRouter();
  const { getIsNewUserFromPhone } = useProfile();

  const [phoneNumber, setPhoneNumber, isValid] = useNumber("", 10);
  const subTitle = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const handleContinue = async () => {
    // Verify if phoneNumber is already registered
    await getIsNewUserFromPhone({ phone: phoneNumber });

    router.push("/auth/(phone)/code");
  };

  return (
    <AuthOptionLayout
      title="Inserisci il tuo numero"
      subTitle={subTitle}>
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
    </AuthOptionLayout>
  );
}
