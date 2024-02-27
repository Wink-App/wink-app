import { useRouter } from "expo-router";

import { useEffect } from "react";

import AuthOptionLayout from "@/appLayouts/AuthOptionLayout";

import { useProfile } from "@/context/user";
import { useNumber } from "@/context/hooks/inputs";

import { ButtonPrimary } from "@/components/elements/Button";
import InputLabel from "@/components/elements/InputLabel";

export default function Phone() {

  const router = useRouter();
  const { insertedPhone, getIsNewUserFromPhone } = useProfile();

  const [phoneNumber, setPhoneNumber, isValid, isInvalidChar] = useNumber("", 10);

  useEffect(() => {
    if (phoneNumber === "" && insertedPhone.length > 0) {
      setPhoneNumber(insertedPhone);
    }
  }, [insertedPhone]);

  const subTitle = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const handleContinue = async () => {
    // await getIsNewUserFromPhone({ phone: phoneNumber, recaptchaVerifier: {} as RecaptchaVerifier });
    router.push("/auth/(phone)/code");
  };

  return (
    <AuthOptionLayout
      title="Inserisci il tuo numero"
      subTitle={subTitle}
      Button={
        <ButtonPrimary
          text="Continua"
          fullWidth
          purple
          style={{ marginBottom: 10 }}
          onPress={handleContinue}
          enabled={isValid}
        />
      }>
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
    </AuthOptionLayout>
  );
}
