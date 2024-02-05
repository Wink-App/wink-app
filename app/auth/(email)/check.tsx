import { useRouter } from "expo-router";

import { Text, View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import "../../../firebase.config";

import { useProfile } from "../../../context/user";

import { ButtonOrange, ButtonText } from "../../../components/elements/Button";

import { secondaryText, stylesBase } from "../../../utils/styles";

export default function Check() {

  const router = useRouter();
  const { insertedEmail } = useProfile();

  const subTitle = "Usa il link inviato via email per reimpostare la tua password. Se non trovi l'email, controlla la cartella spam o prova a reinviare il link.";

  const handleContinue = async () => {
    // 
  };

  return (
    <AuthOptionLayout
      title="Controlla la tua email"
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
      <View
        style={{
          width: "100%",
          ...stylesBase.flexColumnCenter,
          marginTop: 5,
          gap: 15,
        }}>
        <ButtonOrange
          text="Torna al login"
          onPress={handleContinue}
        />
        <ButtonText
          text="Reinvia email"
          underlined
          style={{
            ...stylesBase.fontBold,
            color: secondaryText,
            fontSize: 14,
          }}
          onPress={() => { }}
        />
      </View>
    </AuthOptionLayout>
  );
}