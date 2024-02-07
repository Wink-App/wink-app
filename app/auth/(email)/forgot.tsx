import { useRouter } from "expo-router";

import { useEffect } from "react";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import "../../../firebase.config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { useProfile } from "../../../context/user";
import { useEmail } from "../../../context/hooks/inputs";

import { ButtonPrimary } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

export default function Forgot() {

  const router = useRouter();
  const { insertedEmail, setInsertedEmail } = useProfile();

  const [email, setEmail, isValid, isInvalidChar] = useEmail("");

  useEffect(() => {
    if (email === "" && insertedEmail.length > 0) {
      setEmail(insertedEmail);
    }
  }, [insertedEmail]);

  const subTitle = "Ti invieremo un link via email per reimpostare la tua password.";

  const auth = getAuth();

  const handleSend = async () => {
    setInsertedEmail(email);
    await sendPasswordResetEmail(auth, insertedEmail);
    router.push("/auth/(email)/check");
  };

  return (
    <AuthOptionLayout
      title="Reimposta password"
      subTitle={subTitle}
      Button={
        <ButtonPrimary
          text="Invia"
          fullWidth
          purple
          style={{ marginBottom: 10 }}
          onPress={handleSend}
          enabled={isValid}
        />
      }>
      <InputLabel
        value={email}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci la tua email"
        inputmode="email-address"
        autoFocus
        onChange={(e) => setEmail(e.nativeEvent.text)}
        clearFunction={() => setEmail("")}
      />
    </AuthOptionLayout>
  );
}