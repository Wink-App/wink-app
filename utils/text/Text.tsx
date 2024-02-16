import { Text, TextStyle } from "react-native";

import { secondaryText, stylesBase } from "../styles";

type TextProps = {
  children: React.ReactNode;
  bold?: boolean;
  secondary?: boolean;
  style?: TextStyle;
};

export function TextSmall({
  children,
  bold = false,
  secondary = false,
  style = {},
}: TextProps) {
  const fontWeight = bold ? stylesBase.fontBold : stylesBase.fontRegular;
  const color = secondary ? secondaryText : "black";
  return <Text style={{ ...fontWeight, color, fontSize: 12, ...style }}>{children}</Text>;
}

export function TextMid({
  children,
  bold = false,
  style = {},
}: TextProps) {
  const fontWeight = bold ? stylesBase.fontBold : stylesBase.fontRegular;
  return <Text style={{ ...fontWeight, fontSize: 14, ...style }}>{children}</Text>;
}

export function TextBig({
  children,
  bold = false,
  style = {},
}: TextProps) {
  const fontWeight = bold ? stylesBase.fontBold : stylesBase.fontRegular;
  return <Text style={{ ...fontWeight, fontSize: 16, ...style }}>{children}</Text>;
}

