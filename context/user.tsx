import React, { createContext, useContext, useState } from "react";

import "../firebase.config";
import { Profile } from "./types/profile.type";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

type ContextProps = {
  isNewUser: boolean | null;
  getIsNewUserFromEmail: ({ email }: { email: string }) => Promise<void>;
  getIsNewUserFromPhone: ({ phone }: { phone: string }) => Promise<void>;

  insertedEmail: string;
  insertedPhone: string;

  profile: Profile | null;
  loadingProfile: boolean;
  getProfile: () => Promise<void>;

};

type ProviderProps = {
  children: React.ReactNode;
};

const auth = getAuth();

const Context = createContext({} as ContextProps) as React.Context<ContextProps>;

const Provider = ({ children }: ProviderProps) => {

  const [isNewUser, setIsNewUser] = useState<boolean>(null);

  const [insertedEmail, setInsertedEmail] = useState<string>("");
  const [insertedPhone, setInsertedPhone] = useState<string>("");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const contextValues: ContextProps = {
    isNewUser,
    getIsNewUserFromEmail,
    getIsNewUserFromPhone,

    insertedEmail,
    insertedPhone,

    profile,
    loadingProfile,
    getProfile,

  };

  async function getIsNewUserFromEmail({ email }: { email: string }) {
    setInsertedEmail(email);
    try {
      const signinmethods = await fetchSignInMethodsForEmail(auth, email);
      console.log(" length is ");
      console.log(signinmethods.length);
      if (signinmethods.length > 0) {
        setIsNewUser(false);
        console.log("not a new user");
      } else {
        console.log("yes a new user in user.tsx file");
        setIsNewUser(true);
      }
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        console.log("yes new user is here ");
        setIsNewUser(true);
      }
      console.log("Error checking user existence! -> ", error);
    }
  }

  async function getIsNewUserFromPhone({ phone }: { phone: string }) {
    setInsertedPhone(phone);
    // TODO: Back-End call

    setIsNewUser(true);
  }

  async function getProfile() {

  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useProfile = () => useContext(Context);

export default Provider;
