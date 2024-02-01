import { useRouter } from "expo-router";
import "../../../firebase.config";

import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { usePassword } from "../../../context/hooks/inputs";
import { useProfile } from "../../../context/user";

import { ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

import { secondaryText, stylesBase } from "../../../utils/styles";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
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
    // If isNewUser, register email and password
    // use insertedEmail and password
    if (isNewUser) {
      const resp = await createUserWithEmailAndPassword(auth, insertedEmail, password);
      console.log("new user sign up -> ");
      // console.log(resp);
      // console.log(resp.user);
      let db = getDatabase();
      let userid = resp.user.uid;
      let data = {
        insertedEmail
      }
      const dbResponse = await set(ref(db, `users/${userid}`), data)
      console.log(dbResponse);
      // router.push("/home/home");
    } else {
      const resp = await signInWithEmailAndPassword(auth, insertedEmail, password);
      // console.log("alredy user login here -> : ", resp)
      // console.log("alredy user login here -> : ", resp.user)
    }

    router.push("/home/home");
    // If !isNewUser, check if password matches
    // use password related to insertedEmail

    // then
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
