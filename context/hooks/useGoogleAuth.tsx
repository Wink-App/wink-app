import { useRouter } from "expo-router";

import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { getDatabase, ref, set } from "firebase/database";

export default function useGoogleAuth() {

  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        "1079002699250-hm004798nlhjr22mrstln0hn5bfpl5ug.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
  }, []);

  const handleGoogleAuth = async () => {

    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.signIn();

    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);

    const authResult = await auth().signInWithCredential(googleCredentials);

    const db = getDatabase();

    if (authResult.additionalUserInfo.isNewUser) {
      // New user
      const data = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        profile: userInfo.user.photo
      };

      await set(ref(db, `users/${authResult.user.uid}`), data);
      router.push("/home/home");
    } else {
      // Not new user
      router.push("/home/home");
    }
  };

  return { handleGoogleAuth };
}