import { useRouter } from "expo-router";

import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin
} from "@react-native-google-signin/google-signin";
import { Image, StyleSheet, Text, View } from "react-native";

import SafeAreaLayout from "../../appLayouts/SafeAreaLayout";

import { getDatabase, ref, set } from "firebase/database";

import { ButtonAuth } from "../../components/elements/Button";
import { windowWidth } from "../../utils/utils";

import { colorPurple, colorWhite, secondaryText, stylesBase, TextUnderlined } from "../../utils/styles";


export default function Home() {

  const {
    wrapper,
    whiteCircle,
    container,
    logo,
    policy,
  } = styles;

  const logoDir = require("../../assets/logos/WinkLogo1.png");

  const router = useRouter();

  const handleEmailAuth = () => {
    router.push("/auth/(email)/email");
  };

  const handlePhoneAuth = () => {
    router.push("/auth/(phone)/phone");
  };


  const handleGoogleAuth = async () => {
    console.log("above");
    await GoogleSignin.hasPlayServices();
    console.log("here");
    const userinfo = await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.signIn();
    const googlecredentials = auth.GoogleAuthProvider.credential(idToken);
    const authresult = await auth().signInWithCredential(googlecredentials);
    const db = getDatabase();
    if (authresult.additionalUserInfo.isNewUser) {
      console.log("new user");
      const data = {
        name: userinfo.user.name,
        email: userinfo.user.email,
        profile: userinfo.user.photo
      };
      await set(ref(db, `users/${authresult.user.uid}`), data);
      router.push("/home/home");
    } else {
      console.log("not new user");
      router.push("/home/home");
    }

    console.log("user Info is : ", userinfo.user);
    console.log("auth result is : ", authresult);

    console.warn("handle Google Auth");
  };

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        "1079002699250-hm004798nlhjr22mrstln0hn5bfpl5ug.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
  }, []);

  const bodyCopy = "Continuando, accetti automaticamente i nostri\n";

  return (
    <View style={wrapper}>
      <View style={whiteCircle}>
        <SafeAreaLayout>
          <View style={container}>
            <Image
              source={logoDir}
              style={logo}
            />
            <ButtonAuth
              authProvider="google"
              onPress={() => { handleGoogleAuth(); }}
            />
            <ButtonAuth
              authProvider="apple"
              onPress={() => { }}
            />
            <ButtonAuth
              authProvider="facebook"
              onPress={() => { }}
            />
            <ButtonAuth
              authProvider="email"
              onPress={handleEmailAuth}
            />
            <ButtonAuth
              authProvider="phone"
              onPress={handlePhoneAuth}
            />
            <Text style={policy}>
              {bodyCopy}
              <TextUnderlined>Termini e Condizioni</TextUnderlined>,&nbsp;
              <TextUnderlined>Privacy Policy</TextUnderlined>&nbsp;e&nbsp;
              <TextUnderlined>Cookie Policy</TextUnderlined>.
            </Text>
          </View>
        </SafeAreaLayout>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: colorPurple,
    ...stylesBase.flexColumnEndCenter,
  },
  whiteCircle: {
    width: windowWidth * 1.5,
    height: "82%",
    backgroundColor: colorWhite,
    borderTopLeftRadius: windowWidth * 1.5 / 2,
    borderTopRightRadius: windowWidth * 1.5 / 2,
    ...stylesBase.flexColumnCenter,
  },
  container: {
    height: "100%",
    ...stylesBase.flexColumnStartCenter,
    gap: 20,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 5,
    marginTop: 30,
  },
  policy: {
    ...stylesBase.fontRegular,
    color: secondaryText,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
});
