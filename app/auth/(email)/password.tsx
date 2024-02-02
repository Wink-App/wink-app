import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import "../../../firebase.config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import { useProfile } from "../../../context/user";
import { usePassword } from "../../../context/hooks/inputs";

import { ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

import { secondaryText, stylesBase } from "../../../utils/styles";

const auth = getAuth();

export default function Password() {

  const router = useRouter();
  const { isNewUser, insertedEmail } = useProfile();

  useEffect(() => {
    if (isNewUser) {
      setTitle("Crea una password");
      setSubTitle("Scegli una password per il tuo account.");
    } else {
      setTitle("Bentornato!");
      setSubTitle("Usa la tua password per accedere al tuo account.");
    }
  }, [isNewUser]);

  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  const [password, setPassword, isValid, isInvalidChar] = usePassword("");

  const handleContinue = async () => {
    if (isNewUser) {
      const response = await createUserWithEmailAndPassword(auth, insertedEmail, password);
      const userid = response.user.uid;

      const db = getDatabase();
      // Do we need to put insertedEmail in this data object?
      const data = {
        insertedEmail
      };

      await set(ref(db, `users/${userid}`), data);
      router.push("/home/home");
    } else {
      try {
        await signInWithEmailAndPassword(auth, insertedEmail, password);
        router.push("/home/home");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Alert.alert("Si è verificato un errore durante l'accesso. Riprova.");
      }
    }
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
        {insertedEmail}
      </Text>
      <InputLabel
        value={password}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci password"
        inputmode="default"
        autoFocus
        onChange={(e) => setPassword(e.nativeEvent.text)}
        clearFunction={() => setPassword("")}
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
