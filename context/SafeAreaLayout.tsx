import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}