import { useRouter } from "expo-router";

import { Text, View } from "react-native";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import "../../../firebase.config";

import { useProfile } from "../../../context/user";

import { ButtonPrimary, ButtonText } from "../../../components/elements/Button";

import { secondaryText, stylesBase } from "../../../utils/styles";

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
                <View
                    style={{
                        width: "100%",
                        ...stylesBase.flexColumnCenter,
                        marginTop: 5,
                        gap: 15,
                    }}>
                    <ButtonPrimary
                        text="Torna al login"
                        fullWidth
                        purple
                        style={{ marginBottom: 10 }}
                        onPress={handleRedirect}
                    />
                    <ButtonText
                        text="Reinvia email"
                        underlined
                        style={{
                            ...stylesBase.fontBold,
                            color: secondaryText,
                            fontSize: 14,
                        }}
                        onPress={handleResend}
                    />
                </View>
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
        </AuthOptionLayout>
    );
}