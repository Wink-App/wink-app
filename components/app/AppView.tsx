import { DimensionValue, View, ViewStyle } from "react-native";

import { stylesBase } from "@/utils/styles";

type AppViewProps = {
  children?: React.ReactNode;

  windowWidth?: boolean;

  width100?: boolean;
  height100?: boolean;

  width?: number | string;
  height?: number | string;

  flexRowCenter?: boolean;
  flexRowSpaceBetCenter?: boolean;
  flexRowStartCenter?: boolean;
  flexRowEndCenter?: boolean;

  flexColumnCenter?: boolean;
  flexColumnStartLeft?: boolean;
  flexColumnStartCenter?: boolean;
  flexColumnEndCenter?: boolean;
  flexColumnSpaceBetCenter?: boolean;

  gap?: number;
  padding?: number;
  paddingTop?: number;
  paddingHorizontal?: number;

  marginTop?: number;

  borderRadius?: number;

  backgroundColorPurple?: boolean;
  backgroundColor?: string;

  redBorder?: boolean;

  style?: ViewStyle;
};

export default function AppView({
  children,

  windowWidth = false,

  width100 = false,
  height100 = false,

  width = null,
  height = null,

  flexRowCenter = false,
  flexRowSpaceBetCenter = false,
  flexRowStartCenter = false,
  flexRowEndCenter = false,

  flexColumnCenter = false,
  flexColumnStartLeft = false,
  flexColumnStartCenter = false,
  flexColumnEndCenter = false,
  flexColumnSpaceBetCenter = false,

  gap = null,
  padding = null,
  paddingTop = null,
  paddingHorizontal = null,

  marginTop = null,

  borderRadius = null,

  backgroundColorPurple = false,
  backgroundColor = null,

  redBorder = false,

  style = {},
}: AppViewProps) {
  const styles: ViewStyle[] = [style];

  if (windowWidth) styles.push(stylesBase.windowWidth);
  else if (width100) styles.push(stylesBase.width100);
  else if (width) styles.push({ width: width as DimensionValue });

  if (height100) styles.push(stylesBase.height100);
  else if (height) styles.push({ height: height as DimensionValue });

  if (flexRowCenter) styles.push(stylesBase.flexRowCenter);
  else if (flexRowSpaceBetCenter) styles.push(stylesBase.flexRowSpaceBetCenter);
  else if (flexRowStartCenter) styles.push(stylesBase.flexRowStartCenter);
  else if (flexRowEndCenter) styles.push(stylesBase.flexRowEndCenter);
  else if (flexColumnCenter) styles.push(stylesBase.flexColumnCenter);
  else if (flexColumnStartLeft) styles.push(stylesBase.flexColumnStartLeft);
  else if (flexColumnStartCenter) styles.push(stylesBase.flexColumnStartCenter);
  else if (flexColumnEndCenter) styles.push(stylesBase.flexColumnEndCenter);
  else if (flexColumnSpaceBetCenter) styles.push(stylesBase.flexColumnSpaceBetCenter);

  if (gap) styles.push({ gap });
  if (padding) styles.push({ padding });
  if (paddingTop) styles.push({ paddingTop });
  if (paddingHorizontal) styles.push({ paddingHorizontal });

  if (marginTop) styles.push({ marginTop });

  if (backgroundColorPurple) styles.push(stylesBase.backgroundColorPurple);
  else if (backgroundColor) styles.push({ backgroundColor });

  if (borderRadius) styles.push({ borderRadius });
  if (redBorder) styles.push(stylesBase.redBorder);

  return <View style={styles}>{children}</View>;
}