import { useRouter } from "expo-router";

import AuthOptionLayout from "../../../appLayouts/AuthOptionLayout";

import { getAuth } from "firebase/auth";

import { useProfile } from "../../../context/user";
import { useNumber } from "../../../context/hooks/inputs";

import { ButtonPrimary } from "../../../components/elements/Button";
import InputLabel from "../../../components/elements/InputLabel";


const auth = getAuth();

export default function Phone() {

  // const recaptchaVerifier = useRef(null);
  const router = useRouter();
  const { getIsNewUserFromPhone, isNewUser } = useProfile();

  const [phoneNumber, setPhoneNumber, isValid, isInvalidChar] = useNumber("", 10);
  const subTitle = "Controlleremo se hai già un account. In caso\ncontrario, ne creeremo uno nuovo.";

  const handleContinue = async () => {
    await getIsNewUserFromPhone({ phone: phoneNumber });
    // if (isNewUser) {
    router.push("/auth/(phone)/code");
    // }
  };

  return (
    // <AuthOptionLayout
    //   title="Inserisci il tuo numero"
    //   subTitle={subTitle}>
    //   <InputLabel
    //     value={phoneNumber}
    //     isInvalidChar={isInvalidChar}
    //     placeholder="Inserisci il tuo numero"
    //     isPhoneNumber
    //     inputmode="number-pad"
    //     autoFocus
    //     onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
    //     clearFunction={() => setPhoneNumber("")}
    //   />
    //   <View
    //     style={{
    //       width: "100%",
    //       ...stylesBase.flexRowCenter,
    //       marginTop: 5,
    //     }}>
    //     <ButtonOrange
    //       text="Continua"
    //       onPress={handleContinue}
    //       enabled={isValid}
    //     />
    //   </View>
    // </AuthOptionLayout>

    <AuthOptionLayout
      title="Inserisci il tuo numero"
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
        value={phoneNumber}
        isInvalidChar={isInvalidChar}
        placeholder="Inserisci il tuo numero"
        isPhoneNumber
        inputmode="number-pad"
        autoFocus
        onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
        clearFunction={() => setPhoneNumber("")}
      />
    </AuthOptionLayout>
  );
}
