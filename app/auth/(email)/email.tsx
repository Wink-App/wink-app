import { useRouter } from "expo-router";

import AuthOptionLayout from "@/appLayouts/AuthOptionLayout";

import "@/firebase.config";

import { useProfile } from "@/context/user";
import { useEmail } from "@/context/hooks/inputs";

import { ButtonPrimary } from "@/components/elements/Button";
import InputLabel from "@/components/elements/InputLabel";

export default function Email() {

  const router = useRouter();
  const { getIsNewUserFromEmail } = useProfile();

  const [email, setEmail, isValid, isInvalidChar] = useEmail("");
  const subTitle = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const handleContinue = async () => {
    await getIsNewUserFromEmail({ email });
    router.push("/auth/(email)/password");
  };

  return (
    <AuthOptionLayout
      title="Iniziamo con la tua email"
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
      <InputLabel
        value={email}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci la tua email"
        inputmode="email-address"
        autoComplete="username"
        autoFocus
        onChange={(e) => setEmail(e.nativeEvent.text)}
        clearFunction={() => setEmail("")}
      />
    </AuthOptionLayout>
  );
}