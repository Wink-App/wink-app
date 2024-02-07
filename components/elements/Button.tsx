import { useRouter } from "expo-router";
import { Image, ImageSource } from "expo-image";

import { Text, TextStyle, View, ViewStyle } from "react-native";
import { BaseButton, TouchableOpacity } from "react-native-gesture-handler";

import {
  colorBlack,
  colorBorderLine,
  colorGreyLighter,
  colorOrange,
  colorPurple,
  colorWhite,
  stylesBase,
} from "../../utils/styles";

type ButtonPrimaryProps = {
  text: string;
  fullWidth?: boolean;
  purple?: boolean;
  orange?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  enabled?: boolean;
};

export function ButtonPrimary({
  text,
  fullWidth = false,
  purple = false,
  orange = false,
  style = {},
  onPress = () => { },
  enabled = true,
}: ButtonPrimaryProps) {

  const widthStyle: ViewStyle = fullWidth ?
    { width: "100%" } : { paddingHorizontal: 25 };

  const bgColor = purple && colorPurple || orange && colorOrange || "transparent";
  const textColor = purple && colorWhite || orange && colorBlack || colorBlack;

  return (
    <BaseButton
      style={{
        ...widthStyle,
        height: 50,
        borderRadius: 25,
        ...stylesBase.flexRowCenter,
        backgroundColor: bgColor,
        opacity: enabled ? 1 : 0.5,
        ...style,
      }}
      onPress={onPress}
      enabled={enabled}>
      <Text
        style={{
          ...stylesBase.fontBold,
          fontSize: 16,
          color: textColor,
        }}>
        {text}
      </Text>
    </BaseButton>
  );
}


type ButtonTextProps = {
  text: string;
  underlined?: boolean;
  style?: TextStyle;
  onPress?: () => void;
};

export function ButtonText({
  text,
  underlined = false,
  style = {},
  onPress = () => { },
}: ButtonTextProps) {

  const underlineStyle: TextStyle = underlined ? {
    textDecorationLine: "underline",
    textDecorationColor: colorBorderLine,
  } : {};

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          height: 50,
          textAlign: "center",
          ...style,
          ...underlineStyle,
        }}>
        {text}
      </Text>
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
        ...stylesBase.flexRowSpaceBetCen,
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
      <Text
        style={{
          ...stylesBase.fontBold,
          fontSize: 16,
        }}>
        {label}
      </Text>
      <View
        style={{
          width: 25,
          height: 25,
        }}
      />
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
    <View
      style={{
        width: "100%",
        ...stylesBase.flexRowStartCenter,
        ...style
      }}>
      <ButtonBack />
    </View>
  );
}




