import { Stack, useNavigation } from "expo-router";

import { createContext, useContext, useEffect, useState } from "react";

import { Section } from "../../../context/types/section.type";
import { SetState } from "../../../context/types/types";

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

  const navigation = useNavigation();
  const [routeName, setRouteName] = useState<string>("");

  useEffect(() => {
    if (routeName) {
      console.log("useEffect", routeName);
      navigation.setOptions({
        tabBarStyle: {
          display: routeName === "index" ? "flex" : "none",
        },
      });
    }
  }, [routeName]);

  return (
    <Provider>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: false,
          /* tabBarStyle: ((route) => {
            const routeName = route.name as string;
            setRouteName(routeName);
          })(route), */
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