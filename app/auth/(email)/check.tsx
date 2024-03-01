import { useRouter } from "expo-router";

import AuthOptionLayout from "@/appLayouts/AuthOptionLayout";

import { useProfile } from "@/context/user";

import AppText from "@/components/app/AppText";
import AppView from "@/components/app/AppView";
import { ButtonPrimary, ButtonText } from "@/components/elements/Button";

export default function Check() {

  const router = useRouter();
  const { insertedEmail } = useProfile();

  const subTitle = "Usa il link inviato via email per reimpostare la tua password. Se non trovi l'email, controlla la cartella spam o prova a reinviare il link.";

  const handleRedirect = async () => {
    router.push("/auth/(email)/email");
  };

  const handleResend = async () => {
    // TODO: Resend email
  };

  return (
    <AuthOptionLayout
      title="Controlla la tua email"
      subTitle={subTitle}
      Button={
        <AppView width100 flexColumnCenter>
          <ButtonPrimary
            text="Torna al login"
            fullWidth
            purple
            onPress={handleRedirect}
          />
          <ButtonText
            style={{ height: 50, marginBottom: 10 }}
            onPress={handleResend}>
            <AppText mid bold secondary underlined>Reinvia email</AppText>
          </ButtonText>
        </AppView>
      }>
      <AppText mid bold secondary lineHeight={21} marginTop={-10}>
        {insertedEmail}
      </AppText>
    </AuthOptionLayout>
  );
}