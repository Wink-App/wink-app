import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import { useProfile } from "../../../context/user";
import { useNumber } from "../../../context/hooks/inputs";

import { ButtonOrange } from "../../../components/elements/Button";
import { InputVerificationCode } from "../../../components/elements/InputVerificationCode";

import { secondaryText, stylesBase } from "../../../utils/styles";

export default function Code() {

  const router = useRouter();
  const { isNewUser, insertedPhone } = useProfile();

  useEffect(() => {
    if (isNewUser) {
      setTitle("Codice di verifica");
      setSubTitle("Per creare il tuo account, inserisci il codice che ti abbiamo inviato via SMS.");
    } else {
      setTitle("Codice di verifica");
      setSubTitle("Per accedere al tuo account, inserisci il codice che ti abbiamo inviato via SMS.");
    }
  }, [isNewUser]);

  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  const [code, setCode, isValid, isInvalidChar] = useNumber("", 6);

  const handleContinue = async () => {
    // Handle code verification

    router.push("/home/home");
  };

  return (
    <AuthOptionLayout
      title={title}
      subTitle={subTitle}>
      <Text
        style={{
          ...stylesBase.fontBold,
          color: secondaryText,
          fontSize: 14,
          lineHeight: 21,
          marginTop: -10,
        }}>
        +39 {insertedPhone}
      </Text>

      <InputVerificationCode
        maxValueChar={6}
        isInvalidChar={isInvalidChar}
        autoFocus
        onChange={(value) => setCode(value)}
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
