import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Alert } from "react-native";

import AuthOptionLayout from "@/appLayouts/AuthOptionLayout";

import { useProfile } from "@/context/user";
import { useNumber } from "@/context/hooks/inputs";

import AppText from "@/components/app/AppText";
import { ButtonPrimary } from "@/components/elements/Button";
import { InputVerificationCode } from "@/components/elements/InputVerificationCode";

export default function Code() {

  const router = useRouter();
  const { isNewUser, insertedPhone, phoneSignUpResult } = useProfile();

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
    try {
      // await confirmCode
      router.push("/main/tabs/home/");
    } catch (error: any) {
      if (error.code === "auth/invalid-verification-code") {
        Alert.alert("Il codice non è valido, riprova.");
      }
      if (error.code === "auth/code-expired") {
        Alert.alert("Il codice è scaduto, riprova.");
        router.back();
      }
    }
  };

  return (
    <AuthOptionLayout
      title={title}
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
      <AppText mid bold secondary lineHeight={21} marginTop={-10}>
        +39 {insertedPhone}
      </AppText>
      <InputVerificationCode
        maxValueChar={6}
        isInvalidChar={isInvalidChar}
        autoFocus
        onChange={(value) => setCode(value)}
      />
    </AuthOptionLayout>
  );
}
