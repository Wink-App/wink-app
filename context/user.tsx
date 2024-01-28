import React, { createContext, useContext, useState } from "react";

import { Profile } from "./types/profile.type";

type ContextProps = {

  profile: Profile | null;
  loadingProfile: boolean;
  getProfile: () => Promise<void>;

};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = createContext({} as ContextProps) as React.Context<ContextProps>;

const Provider = ({ children }: ProviderProps) => {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const contextValues: ContextProps = {

    profile,
    loadingProfile,
    getProfile,

  };

  async function getProfile() {

  }

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useProfile = () => useContext(Context);

export default Provider;
