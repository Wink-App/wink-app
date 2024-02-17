import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Alert } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import { getDatabase, ref, set } from "firebase/database";

import { useProfile } from "../../../context/user";
import { useNumber } from "../../../context/hooks/inputs";

import { ButtonPrimary } from "../../../components/elements/Button";
import { InputVerificationCode } from "../../../components/elements/InputVerificationCode";
import { TextMid } from "../../../utils/text/Text";

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
      const result = await phoneSignUpResult.confirm(code);
      const db = getDatabase();
      const data = {
        phone: result.user.phoneNumber
      };
      if (result.additionalUserInfo.isNewUser) {
        await set(ref(db, `users/${result.user.uid}`), data);
      };
      router.push("/main/home/");
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
      <TextMid
        bold
        secondary
        style={{
          lineHeight: 21,
          marginTop: -10,
        }}>
        +39 {insertedPhone}
      </TextMid>
      <InputVerificationCode
        maxValueChar={6}
        isInvalidChar={isInvalidChar}
        autoFocus
        onChange={(value) => setCode(value)}
      />
    </AuthOptionLayout>
  );
}
