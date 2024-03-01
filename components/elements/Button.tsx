import { useRouter } from "expo-router";
import { Image, ImageSource } from "expo-image";

import { TextStyle, View, ViewStyle } from "react-native";
import { BaseButton, TouchableOpacity } from "react-native-gesture-handler";

import AppView from "@/components/app/AppView";

import {
  colorBlack,
  colorBorderLine,
  colorGreyLighter,
  colorOrange,
  colorPurple,
  colorWhite,
  stylesBase,
} from "../../utils/styles";

import AppText from "../app/AppText";

type ButtonPrimaryProps = {
  text: string;
  fullWidth?: boolean;
  purple?: boolean;
  orange?: boolean;
  border?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  enabled?: boolean;
};

export function ButtonPrimary({
  text,
  fullWidth = false,
  purple = false,
  orange = false,
  border = false,
  style = {},
  onPress = () => { },
  enabled = true,
}: ButtonPrimaryProps) {

  const widthStyle: ViewStyle = fullWidth ?
    { width: "100%" } : { paddingHorizontal: 25 };

  const bgColor = purple && colorPurple || orange && colorOrange || "transparent";
  const textColor = purple && colorWhite || orange && colorBlack || colorBlack;
  const borderStyle = border && { borderWidth: 1, borderColor: colorBorderLine } || {};

  return (
    <BaseButton
      style={{
        ...widthStyle,
        height: 50,
        borderRadius: 25,
        ...stylesBase.flexRowCenter,
        backgroundColor: bgColor,
        opacity: enabled ? 1 : 0.5,
        ...borderStyle,
        ...style,
      }}
      onPress={onPress}
      enabled={enabled}>
      <AppText big bold altColor={textColor}>{text}</AppText>
    </BaseButton>
  );
}

type ButtonTextProps = {
  children: React.ReactNode;
  style?: TextStyle;
  onPress?: () => void;
};

export function ButtonText({
  children,
  style = {},
  onPress = () => { },
}: ButtonTextProps) {
  return (
    <TouchableOpacity
      style={{
        ...stylesBase.flexRowCenter,
        ...style
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

type AuthProvider = "google" | "apple" | "facebook" | "email" | "phone";

type ButtonSocialProps = {
  authProvider: AuthProvider;
  backgroundColor?: string;
  onPress?: () => void;
};

type AuthIconLabel = {
  icon: ImageSource;
  label: string;
};

const getAuthIconLabel: Record<AuthProvider, AuthIconLabel> = {
  google: {
    icon: require("../../assets/auth/Google.svg"),
    label: "Google",
  },
  apple: {
    icon: require("../../assets/auth/Apple.svg"),
    label: "Apple",
  },
  facebook: {
    icon: require("../../assets/auth/Facebook.svg"),
    label: "Facebook",
  },
  email: {
    icon: require("../../assets/auth/Email.svg"),
    label: "Email",
  },
  phone: {
    icon: require("../../assets/auth/Phone.svg"),
    label: "Telefono",
  },
};

export function ButtonAuth({
  authProvider,
  backgroundColor = colorGreyLighter,
  onPress = () => { },
}: ButtonSocialProps) {

  const { icon, label } = getAuthIconLabel[authProvider];

  return (
    <BaseButton
      style={{
        backgroundColor,
        width: 300,
        height: 50,
        borderRadius: 25,
        ...stylesBase.flexRowSpaceBetCenter,
        paddingHorizontal: 15,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: 25,
          height: 25,
        }}
      />
      <AppText big bold>{label}</AppText>
      <View style={{ width: 25, height: 25 }} />
    </BaseButton>
  );
}

type ButtonBackProps = {
  onPress?: () => void;
};

export function ButtonBack({
  onPress = null,
}: ButtonBackProps) {

  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        ...stylesBase.flexRowCenter,
      }}
      onPress={handlePress}>
      <Image
        source={require("../../assets/icons/Back.svg")}
        style={{
          width: 25,
          height: 25,
        }}
      />
    </TouchableOpacity>
  );
}

export function FullLineButtonBack({ style = {} }: { style?: ViewStyle }) {
  return (
    <AppView width100 flexRowStartCenter style={style}>
      <ButtonBack />
    </AppView>
  );
}




