import React, { createContext, useContext, useState } from "react";

import "../firebase.config";
import {
  ConfirmationResult,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";

import { Profile } from "./types/profile.type";
import { getIsNewUserFromPhoneProps, SetState } from "./types/types";

type ContextProps = {
  isNewUser: boolean | null;
  getIsNewUserFromEmail: ({ email }: { email: string }) => Promise<void>;
  getIsNewUserFromPhone: ({ phone, recaptchaVerifier }: getIsNewUserFromPhoneProps) => Promise<void>;

  insertedEmail: string;
  setInsertedEmail: SetState<string>;
  insertedPhone: string;
  phoneSignUpResult: ConfirmationResult | undefined;

  profile: Profile | null;
  loadingProfile: boolean;
  getProfile: () => Promise<void>;

};

type ProviderProps = {
  children: React.ReactNode;
};

const myAuth = getAuth();

const Context = createContext({} as ContextProps) as React.Context<ContextProps>;

const Provider = ({ children }: ProviderProps) => {

  const [isNewUser, setIsNewUser] = useState<boolean>(null);

  const [insertedEmail, setInsertedEmail] = useState<string>("");
  const [insertedPhone, setInsertedPhone] = useState<string>("");
  const [phoneSignUpResult, setPhoneSignUpResult] = useState<ConfirmationResult>();

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
    // setInsertedEmail(email);
    // setIsNewUser(false);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(myAuth, email);
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

  async function getIsNewUserFromPhone({ phone, recaptchaVerifier }: getIsNewUserFromPhoneProps) {
    setInsertedPhone(phone);
    try {
      const phoneNumber = `+39${phone}`;
      const result = await signInWithPhoneNumber(
        myAuth,
        phoneNumber,
        recaptchaVerifier.current
      );
      setPhoneSignUpResult(result);
      setIsNewUser(true);
    } catch (error: any) {
      console.error("Error sending verification code:", error);
      setIsNewUser(false);
    }
  }

  async function getProfile() {

  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useProfile = () => useContext(Context);

export default Provider;
