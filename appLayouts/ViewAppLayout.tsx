import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View, ViewStyle } from "react-native";

import { stylesBase } from "@/utils/styles";

import SafeAreaLayout from "./SafeAreaLayout";

type ViewAppLayoutProps = {
  children: React.ReactNode;

  center?: boolean;
  padding: boolean;
  tabBarPadding: boolean;

  style?: ViewStyle;
};

export default function ViewAppLayout({
  children,
  center = false,
  padding = false,
  tabBarPadding = false,
  style = {},
}: ViewAppLayoutProps) {

  const tabBarHeight = useBottomTabBarHeight();
  const currentstyle: ViewStyle = {
    ...(center ? stylesBase.flexColumnCenter : stylesBase.flexColumnStartLeft),
    padding: padding ? 20 : 0,
    paddingBottom: tabBarPadding ? tabBarHeight : 0,
    gap: 20,
    ...style,
  };

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
 * ScrollView vertical
 * FlatList horizontal
 * FlatList vertical?
 * 
 * KeyboardAvoidingView
 * DismissKeyboard
 */