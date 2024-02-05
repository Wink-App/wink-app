import { useRouter } from "expo-router";

import { useEffect } from "react";
import { View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import "../../../firebase.config";

import { useProfile } from "../../../context/user";
import { useEmail } from "../../../context/hooks/inputs";

import { ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

import { stylesBase } from "../../../utils/styles";

export default function Forgot() {

  const router = useRouter();
  const { insertedEmail, setInsertedEmail } = useProfile();

  const [email, setEmail, isValid, isInvalidChar] = useEmail(insertedEmail || "");

  useEffect(() => {
    if (email) setInsertedEmail(email);
  }, [email]);

  const subTitle = "Ti invieremo un link via email per reimpostare la tua password.";

  const handleSend = async () => {
    // 
    router.push("/auth/(email)/check");
  };

  return (
    <AuthOptionLayout
      title="Reimposta password"
      subTitle={subTitle}>
      <InputLabel
        value={email}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci la tua email"
        inputmode="email-address"
        autoFocus
        onChange={(e) => setEmail(e.nativeEvent.text)}
        clearFunction={() => setEmail("")}
      />
      <View
        style={{
          width: "100%",
          ...stylesBase.flexRowCenter,
          marginTop: 5,
        }}>
        <ButtonOrange
          text="Invia"
          onPress={handleSend}
          enabled={isValid}
        />
      </View>
    </AuthOptionLayout>
  );
}