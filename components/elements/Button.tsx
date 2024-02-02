import { useRouter } from "expo-router";
import { ImageSource } from "expo-image";

import { Image, Text, TextStyle, View } from "react-native";
import { BaseButton, TouchableOpacity } from "react-native-gesture-handler";

import { colorBlack, colorGreyLighter, colorOrange, stylesBase } from "../../utils/styles";

type ButtonOrangeProps = {
  text: string;
  onPress?: () => void;
  enabled?: boolean;
};

export function ButtonOrange({
  text,
  onPress = () => { },
  enabled = true,
}: ButtonOrangeProps) {
  return (
    <BaseButton
      style={{
        height: 50,
        borderRadius: 25,
        ...stylesBase.flexRowSpaceBetCen,
        paddingHorizontal: 25,
        backgroundColor: colorOrange,
        opacity: enabled ? 1 : 0.5,
      }}
      onPress={onPress}
      enabled={enabled}>
      <Text
        style={{
          ...stylesBase.fontBold,
          fontSize: 16,
          color: colorBlack,
        }}>
        {text}
      </Text>
    </BaseButton>
  );
}


type ButtonTextProps = {
  text: string;
  styleText: TextStyle;
  onPress: () => void;
};

export function ButtonText({ text, styleText, onPress }: ButtonTextProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styleText}>{text}</Text>
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




