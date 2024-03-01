import React, { createContext, useContext, useState } from "react";

import { Product } from "./types/product.type";
import { Profile } from "./types/profile.type";
import { SetState } from "./types/types";

type ContextProps = {
  isNewUser: boolean | null;
  getIsNewUserFromEmail: ({ email }: { email: string }) => Promise<void>;
  getIsNewUserFromPhone: ({ phone, recaptchaVerifier }: any) => Promise<void>;

  insertedEmail: string;
  setInsertedEmail: SetState<string>;
  insertedPhone: string;
  phoneSignUpResult: any;

  profile: Profile | null;
  loadingProfile: boolean;
  getProfile: () => Promise<void>;

  selectedProduct: Product;
  setSelectedProduct: SetState<Product>;

};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = createContext({} as ContextProps) as React.Context<ContextProps>;

const Provider = ({ children }: ProviderProps) => {

  const [isNewUser, setIsNewUser] = useState<boolean>(null);

  const [insertedEmail, setInsertedEmail] = useState<string>("");
  const [insertedPhone, setInsertedPhone] = useState<string>("");
  const [phoneSignUpResult, setPhoneSignUpResult] = useState<any>({});

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product);

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

    selectedProduct,
    setSelectedProduct,

  };

  async function getIsNewUserFromEmail({ email }: { email: string }) {
    setInsertedEmail(email);
    setIsNewUser(true);
    // try {
    //   const signInMethods = await fetchSignInMethodsForEmail(myAuth, email);
    //   if (signInMethods.length > 0) {
    //     setIsNewUser(false);
    //   } else {
    //     setIsNewUser(true);
    //   }
    // } catch (error: any) {
    //   if (error.code === "auth/user-not-found") {
    //     setIsNewUser(true);
    //   }
    // }
  }

  async function getIsNewUserFromPhone({ phone, recaptchaVerifier }: any) {
    setInsertedPhone(phone);
    // try {
    //   const phoneNumber = `+92${phone}`;
    //   const result = await signInWithPhoneNumber(myAuth, phoneNumber, recaptchaVerifier);
    //   setPhoneSignUpResult(result);
    //   setIsNewUser(true);
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (error: any) {
    //   setIsNewUser(false);
    // }
  }

  async function getProfile() {

  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useProfile = () => useContext(Context);

export default Provider;
