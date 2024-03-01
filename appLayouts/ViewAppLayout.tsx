import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View, ViewStyle } from "react-native";

import { DismissKeyboard } from "@/components/transitions/Keyboard";

import { stylesBase } from "@/utils/styles";

import SafeAreaLayout from "./SafeAreaLayout";

type ViewAppLayoutProps = {
  children: React.ReactNode;

  center?: boolean;
  padding: boolean;
  tabBarPadding: boolean;

  dismissKeyboard?: boolean;

  style?: ViewStyle;
};

export default function ViewAppLayout({
  children,
  center = false,
  padding = false,
  tabBarPadding = false,
  dismissKeyboard = false,
  style = {},
}: ViewAppLayoutProps) {

  const tabBarHeight = useBottomTabBarHeight();
  const currentstyle: ViewStyle = {
    ...(center ? stylesBase.flexColumnCenter : stylesBase.flexColumnStartLeft),
    paddingTop: 20,
    paddingHorizontal: padding ? 20 : 0,
    paddingBottom: tabBarPadding ? tabBarHeight : 0,
    gap: 20,
    ...style,
  };

  if (dismissKeyboard) {
    return (
      <SafeAreaLayout>
        <DismissKeyboard>
          <View
            style={currentstyle}>
            {children}
          </View>
        </DismissKeyboard>
      </SafeAreaLayout>
    );
  }

  return (
    <SafeAreaLayout>
      <View
        style={currentstyle}>
        {children}
      </View>
    </SafeAreaLayout>
  );
}

/**
 * Componenti generali: 
 * SafeAreaLayout
 * View with main styles
 * 
 * KeyboardAvoidingView
 * DismissKeyboard
 */