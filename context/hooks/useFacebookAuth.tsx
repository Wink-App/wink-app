import auth from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

export default function useFacebookAuth() {

  const handleFacebookAuth = async () => {
    const result = await LoginManager?.logInWithPermissions(["public_profile", "email"]);

    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredentials = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credentials
    return auth().signInWithCredential(facebookCredentials);

  };

  return { handleFacebookAuth };
}