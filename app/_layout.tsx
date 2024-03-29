import { SplashScreen, Stack } from "expo-router";
import * as Font from "expo-font";

import { useCallback } from "react";
import { View } from "react-native";

import Provider from "../context/user";

import ToastProvider from "../context/toast";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = Font.useFonts({
    "Bogart-Medium-trial": require("../assets/fonts/Bogart-Medium-trial.ttf"),
    "Bogart-Bold-trial": require("../assets/fonts/Bogart-Bold-trial.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider>
      <ToastProvider>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="index"
            />
            <Stack.Screen
              name="auth"
            />
            <Stack.Screen
              name="main"
            />
          </Stack>
        </View>
      </ToastProvider>
    </Provider>
  );
}
