import React, { createContext, useContext, useState } from "react";
import auth from "@react-native-firebase/auth";

import "../firebase.config";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

import { Profile } from "./types/profile.type";
import { SetState } from "./types/types";


type ContextProps = {
  isNewUser: boolean | null;
  getIsNewUserFromEmail: ({ email }: { email: string }) => Promise<void>;
  getIsNewUserFromPhone: ({ phone }: { phone: string }) => Promise<void>;

  insertedEmail: string;
  setInsertedEmail: SetState<string>;
  insertedPhone: string;
  phoneSignUpResult: any;

  profile: Profile | null;
  loadingProfile: boolean;
  getProfile: () => Promise<void>;

};

type ProviderProps = {
  children: React.ReactNode;
};

const myauth = getAuth();


const Context = createContext({} as ContextProps) as React.Context<ContextProps>;

const Provider = ({ children }: ProviderProps) => {

  const [isNewUser, setIsNewUser] = useState<boolean>(null);

  const [insertedEmail, setInsertedEmail] = useState<string>("");
  const [insertedPhone, setInsertedPhone] = useState<string>("");
  const [phoneSignUpResult, setConfirmationResult] = useState<any>({});

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const contextValues: ContextProps = {
    isNewUser,
    getIsNewUserFromEmail,
    getIsNewUserFromPhone,

    insertedEmail,
    setInsertedEmail,
    insertedPhone,
    phoneSignUpResult,

    profile,
    loadingProfile,
    getProfile,

  };

  async function getIsNewUserFromEmail({ email }: { email: string }) {
    setInsertedEmail(email);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(myauth, email);
      if (signInMethods.length > 0) {
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setIsNewUser(true);
      }
    }
  }

  async function getIsNewUserFromPhone({ phone }: { phone: string }) {
    try {
      setInsertedPhone(phone);
      const phno = `+92${phone}`;
      const result = await auth().signInWithPhoneNumber(
        phno,
      );
      console.log(result);
      setConfirmationResult(result);
      setIsNewUser(true);
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  }

  async function getProfile() {

  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useProfile = () => useContext(Context);

export default Provider;
