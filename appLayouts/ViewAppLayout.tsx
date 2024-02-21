import { View } from "react-native";

import { stylesBase } from "@/utils/styles";

import SafeAreaLayout from "./SafeAreaLayout";

type ViewAppLayoutProps = {
  children: React.ReactNode;
};

export default function ViewAppLayout({ children }: ViewAppLayoutProps) {
  return (
    <SafeAreaLayout>
      <View
        style={{
          ...stylesBase.flexColumnStartLeft,
          gap: 20,
          padding: 20,
        }}>
        {children}
      </View>
    </SafeAreaLayout>
  );
}

/**
 * Componenti generali: 
 * SafeAreaLayout
 * View padding
 * ScrollView vertical
 * FlatList horizontal
 * FlatList vertical?
 * KeyboardAvoidingView
 * DismissKeyboard
 */