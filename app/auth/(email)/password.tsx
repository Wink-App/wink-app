import { useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import "../../../firebase.config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import { useProfile } from "../../../context/user";
import { useDebounceEffect, usePassword } from "../../../context/hooks/inputs";

import { ButtonPrimary, ButtonText } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";
import TransitionElement from "../../../components/transitions/TransitionElement";

import { secondaryText, stylesBase, TextBold, TextBullet } from "../../../utils/styles";

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

  const handleForgotPassword = () => {
    router.push("/auth/(email)/forgot");
  };

  const [password, setPassword, isValid, isInvalidChar, rules] = usePassword("");
  const [confirmPassword, setConfirmPassword, isValidConfirm, isInvalidCharConfirm] = usePassword("");
  const [arePasswordsEqual, setArePasswordsEqual] = useState<boolean>(null);
  const [enableContinue, setEnableContinue] = useState<boolean>(false);

  const handleContinue = async () => {
    if (isNewUser) {
      if (password !== confirmPassword) {
        setArePasswordsEqual(false);
        return;
      } else {
        setArePasswordsEqual(true);
      }
    }

    if (isNewUser) {
      const response = await createUserWithEmailAndPassword(auth, insertedEmail, password);
      const userid = response.user.uid;

      const db = getDatabase();
      // TODO: Do we need to put insertedEmail in this data object?
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
      } catch (error: any) {
        if (error.code === "auth/wrong-password") {
          Alert.alert("La tua email o password è incorretta. Riprova.");
        } else {
          Alert.alert("Si è verificato un errore durante l'accesso. Riprova.");
        }
      }
    }
  };

  useDebounceEffect(() => {
    if (password === "" || confirmPassword === "") {
      setArePasswordsEqual(null);
    } else {
      if (password === confirmPassword) {
        setArePasswordsEqual(true);
      } else {
        setArePasswordsEqual(false);
      }
    }
  }, [password, confirmPassword], 250);

  useEffect(() => {
    if (isNewUser) {
      if (isValid && isValidConfirm && arePasswordsEqual) {
        setEnableContinue(true);
      } else {
        setEnableContinue(false);
      }
    } else {
      if (isValid) {
        setEnableContinue(true);
      } else {
        setEnableContinue(false);
      }
    }
  }, [password, confirmPassword, arePasswordsEqual]);

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
          enabled={enableContinue}
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
        {insertedEmail}
      </Text>
      <InputLabel
        value={password}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci password"
        isPassword
        inputmode="default"
        autoComplete={isNewUser ? "new-password" : "current-password"}
        autoFocus
        onChange={(e) => setPassword(e.nativeEvent.text)}
        clearFunction={() => setPassword("")}
      />
      <TextBullet
        color={secondaryText}
        style={{
          fontSize: 14,
          lineHeight: 21,
          marginTop: -5,
        }}>
        Almeno <TextBold color={rules.colorLenght}>9 caratteri</TextBold>
      </TextBullet>
      <TextBullet
        color={secondaryText}
        style={{
          fontSize: 14,
          lineHeight: 21,
          marginTop: -10,
        }}>
        <TextBold color={rules.colorLetter}>Lettera</TextBold>,&nbsp;
        <TextBold color={rules.colorNumber}>numero</TextBold>,&nbsp;
        <TextBold color={rules.colorSpecialChar}>carattere speciale</TextBold>
      </TextBullet>
      {isNewUser === true && (
        <InputLabel
          value={confirmPassword}
          isInvalidChar={isInvalidCharConfirm}
          placeholder="Conferma password"
          isPassword
          inputmode="default"
          autoComplete="current-password"
          onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
          clearFunction={() => setConfirmPassword("")}
        />
      )}
      {isNewUser === true && arePasswordsEqual === false && (
        <TransitionElement>
          <Text
            style={{
              ...stylesBase.fontBold,
              color: "red",
              fontSize: 14,
              lineHeight: 21,
              marginTop: -5,
            }}>
            Le password non corrispondono.
          </Text>
        </TransitionElement>
      )}
      {isNewUser === false && (
        <View
          style={{
            width: "100%",
            ...stylesBase.flexRowEndCenter,
          }}>
          <ButtonText
            text="Password dimenticata?"
            underlined
            style={{
              ...stylesBase.fontBold,
              color: secondaryText,
              fontSize: 12,
            }}
            onPress={handleForgotPassword}
          />
        </View>
      )}
    </AuthOptionLayout>
  );
}
