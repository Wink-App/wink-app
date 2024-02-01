import { useRouter } from "expo-router";

import { View } from "react-native";

import { useEmail } from "../../../context/hooks/inputs";
import { useProfile } from "../../../context/user";

import { ButtonOrange } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";

import { stylesBase } from "../../../utils/styles";

import "../../../firebase.config";
import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

export default function Email() {

  const router = useRouter();
  const { getIsNewUserFromEmail, isNewUser } = useProfile();

  const [email, setEmail, isValid, isInvalidChar] = useEmail("");
  const subTitle = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const handleContinue = async () => {
    await getIsNewUserFromEmail({ email });
    if (isNewUser) {
      console.log(" yes a new user in email screen");
    } else {
      console.log("not a new user in email screen");
    }
    router.push("/auth/(email)/password");
  };

  return (
    <AuthOptionLayout
      title="Iniziamo con la tua email"
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
          text="Continua"
          onPress={handleContinue}
          enabled={isValid}
        />
      </View>
    </AuthOptionLayout>
  );
}