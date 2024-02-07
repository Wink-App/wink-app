import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import { getDatabase, ref, set } from "firebase/database";

import { useProfile } from "../../../context/user";
import { useNumber } from "../../../context/hooks/inputs";

import { ButtonPrimary } from "../../../components/elements/Button";
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
  const { phoneSignUpResult } = useProfile();

  const [code, setCode, isValid, isInvalidChar] = useNumber("", 6);

  const handleContinue = async () => {
    try {
      const result = await phoneSignUpResult.confirm(code);
      const db = getDatabase();
      console.log(result);
      const data = {
        phone: result.user.phoneNumber
      };
      if (result.additionalUserInfo.isNewUser) {
        await set(ref(db, `users/${result.user.uid}`), data);
      };
      router.push("/home/home");
    } catch (error: any) {
      if (error.code == "auth/invalid-verification-code") {
        Alert.alert("Invalid code!");
      }
      if (error.code == "auth/code-expired") {
        Alert.alert("Code expired!");
        router.back();
      }
    }
  };

  return (
    // <AuthOptionLayout
    //   title={title}
    //   subTitle={subTitle}>
    //   <Text
    //     style={{
    //       ...stylesBase.fontBold,
    //       color: secondaryText,
    //       fontSize: 14,
    //       lineHeight: 21,
    //       marginTop: -10,
    //     }}>
    //     +39 {insertedPhone}
    //   </Text>

    //   <InputVerificationCode
    //     maxValueChar={6}
    //     isInvalidChar={isInvalidChar}
    //     autoFocus
    //     onChange={(value) => setCode(value)}
    //   />

    //   <View
    //     style={{
    //       width: "100%",
    //       ...stylesBase.flexRowCenter,
    //       marginTop: 5,
    //     }}>
    //     <ButtonOrange
    //       text="Continua"
    //       onPress={handleContinue}
    //       enabled={isValid}
    //     />
    //   </View>
    // </AuthOptionLayout>

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
    </AuthOptionLayout>
  );
}
