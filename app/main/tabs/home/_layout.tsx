import { Stack } from "expo-router";

import { createContext, useContext, useState } from "react";

import { Section } from "@/context/types/section.type";
import { SetState } from "@/context/types/types";

type ContextProps = {
  selectedSection: Section;
  setSelectedSection: SetState<Section>;
};

const Context = createContext({} as ContextProps) as React.Context<ContextProps>;

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSection, setSelectedSection] = useState<Section>({} as Section);

  const contextValues: ContextProps = {
    selectedSection,
    setSelectedSection,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useHome = () => useContext(Context);

export default function Layout() {
  return (
    <Provider>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name="index"
        />
        <Stack.Screen
          name="section"
        />
        <Stack.Screen
          name="location"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </Provider>
  );
}