import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import { useEffect } from "react";

export default function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "471190546218-djk8ta92vv527dlouetu8ih4fnm67075.apps.googleusercontent.com",
    responseType: ResponseType.Token
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("id token");
      console.log(id_token);
    }
  }, [response]);

  const handleGoogleAuth = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error("Google Auth failed", error);
    }
  };

  return { handleGoogleAuth };
}