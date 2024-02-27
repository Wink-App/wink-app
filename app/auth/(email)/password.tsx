import { useRouter } from "expo-router";

import { useEffect, useState } from "react";

import AppView from "@/appLayouts/AppView";
import AuthOptionLayout from "@/appLayouts/AuthOptionLayout";

import { useProfile } from "@/context/user";
import { useDebounceEffect, usePassword } from "@/context/hooks/inputs";

import { ButtonPrimary, ButtonText } from "@/components/elements/Button";
import InputLabel from "@/components/elements/InputLabel";
import TransitionElement from "@/components/transitions/TransitionElement";
import { TextMid } from "@/utils/text/Text";

import { secondaryText, TextBold, TextBullet } from "@/utils/styles";

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmPassword, setConfirmPassword, isValidConfirm, isInvalidCharConfirm] = usePassword("");
  const [arePasswordsEqual, setArePasswordsEqual] = useState<boolean>(null);
  const [enableContinue, setEnableContinue] = useState<boolean>(false);

  const handleContinue = async () => {
    if (isNewUser) {
      // await createUserWithEmailAndPassword

      router.push("/main/tabs/home/");
    } else {
      try {
        // await signInWithEmailAndPassword
        router.push("/main/tabs/home/");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("La tua email o password è incorretta. Riprova.");
        } else {
          setErrorMessage("Si è verificato un errore. Riprova.");
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
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [password, confirmPassword], 300);

  useEffect(() => {
    if (isNewUser) {
      if (isValid && isValidConfirm && arePasswordsEqual) {
        setEnableContinue(true);
      } else {
        setEnableContinue(false);
      }
    } else {
      if (password !== "" && !errorMessage) {
        setEnableContinue(true);
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
      <TextMid
        bold
        secondary
        style={{
          lineHeight: 21,
          marginTop: -10,
        }}>
        {insertedEmail}
      </TextMid>
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
      {isNewUser === false && errorMessage && (
        <TransitionElement>
          <TextMid
            bold
            style={{
              color: "red",
              lineHeight: 21,
              marginTop: -5,
            }}>
            {errorMessage}
          </TextMid>
        </TransitionElement>
      )}
      {isNewUser === false && (
        <AppView width100 flexRowEndCenter>
          <ButtonText
            onPress={handleForgotPassword}>
            <TextMid bold secondary underlined>Password dimenticata?</TextMid>
          </ButtonText>
        </AppView>
      )}
      {isNewUser === true && (
        <>
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
        </>
      )}
      {isNewUser === true && arePasswordsEqual === false && (
        <TransitionElement>
          <TextMid
            bold
            style={{
              color: "red",
              lineHeight: 21,
              marginTop: -5,
            }}>
            Le password non corrispondono.
          </TextMid>
        </TransitionElement>
      )}
    </AuthOptionLayout>
  );
}
