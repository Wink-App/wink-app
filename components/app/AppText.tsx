import { Text, TextStyle } from "react-native";

import { stylesBase } from "@/utils/styles";

type AltFont = "Bogart";

type AppTextProps = {
  children: React.ReactNode;

  small?: boolean;
  mid?: boolean;
  big?: boolean;

  altFont?: AltFont;
  altFontSize?: number;

  lineHeight?: number;

  bold?: boolean;

  secondary?: boolean;
  secondaryLight?: boolean;
  white?: boolean;
  altColor?: string;

  underlined?: boolean;
  marginTop?: number;
  style?: TextStyle;
};

export default function AppText({
  children,

  altFont,

  small = false,
  mid = false,
  big = false,
  altFontSize,

  bold = false,

  lineHeight,

  secondary = false,
  secondaryLight = false,
  white = false,
  altColor,

  underlined = false,
  marginTop = 0,
  style = {},
}: AppTextProps) {
  const styles: TextStyle[] = [style];

  if (small) styles.push(stylesBase.fontSizeSmall);
  else if (mid) styles.push(stylesBase.fontSizeMid);
  else if (big) styles.push(stylesBase.fontSizeBig);
  else if (altFontSize) styles.push({ fontSize: altFontSize });

  if (altFont && bold) styles.push(stylesBase.fontBogartBold);
  else if (altFont) styles.push(stylesBase.fontBogartMedium);
  else if (bold) styles.push(stylesBase.fontBold);
  else styles.push(stylesBase.fontRegular);

  if (lineHeight) styles.push({ lineHeight });

  if (secondary) styles.push(stylesBase.colorSecondaryText);
  else if (secondaryLight) styles.push(stylesBase.colorSecondaryTextLight);
  else if (white) styles.push({ color: "white" });
  else if (altColor) styles.push({ color: altColor });
  else styles.push({ color: "black" });

  if (underlined) styles.push(stylesBase.underlineText);
  if (marginTop) styles.push({ marginTop });

  return <Text style={styles}>{children}</Text>;
}

type TextUnderlinedProps = {
  children: React.ReactNode;
  style?: TextStyle;
  onPress?: () => void;
};

export function TextUnderlined({
  children,
  onPress = () => { },
}: TextUnderlinedProps) {
  return (
    <Text onPress={onPress} style={stylesBase.underlineText}>
      {children}
    </Text>
  );
}

type TextBoldProps = {
  children: React.ReactNode;
  color?: TextStyle["color"];
};

export function TextBold({ children, color }: TextBoldProps) {
  const style = { ...stylesBase.fontBold, color };
  return <Text style={style}>{children}</Text>;
}