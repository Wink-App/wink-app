import { Text, TextStyle } from "react-native";

import { colorBorderLine, secondaryText, stylesBase } from "../styles";

type TextProps = {
  children: React.ReactNode;
  bold?: boolean;
  secondary?: boolean;
  underlined?: boolean;
  style?: TextStyle;
};

export function TextSmall({
  children,
  bold = false,
  secondary = false,
  underlined = false,
  style = {},
}: TextProps) {
  const fontWeight = bold ? stylesBase.fontBold : stylesBase.fontRegular;
  const color = secondary ? secondaryText : "black";
  const underline: TextStyle = underlined ? { textDecorationLine: "underline", textDecorationColor: colorBorderLine, } : {};
  return <Text style={{ fontSize: 12, ...fontWeight, color, ...underline, ...style }}>{children}</Text>;
}

export function TextMid({
  children,
  bold = false,
  secondary = false,
  underlined = false,
  style = {},
}: TextProps) {
  const fontWeight = bold ? stylesBase.fontBold : stylesBase.fontRegular;
  const color = secondary ? secondaryText : "black";
  const underline: TextStyle = underlined ? { textDecorationLine: "underline", textDecorationColor: colorBorderLine, } : {};
  return <Text style={{ fontSize: 14, ...fontWeight, color, ...underline, ...style }}>{children}</Text>;
}

export function TextBig({
  children,
  bold = false,
  secondary = false,
  style = {},
}: TextProps) {
  const fontWeight = bold ? stylesBase.fontBold : stylesBase.fontRegular;
  const color = secondary ? secondaryText : "black";
  return <Text style={{ fontSize: 16, ...fontWeight, color, ...style }}>{children}</Text>;
}

