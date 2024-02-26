import { View, ViewStyle } from "react-native";

import { windowWidth as windowWidthUtil } from "@/utils/utils";

import { stylesBase } from "@/utils/styles";

type AppViewProps = {
  children: React.ReactNode;

  windowWidth?: boolean;

  width100?: boolean;
  height100?: boolean;

  width?: number;
  height?: number;

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
  redBorder = false,
  style = {},
}: AppViewProps) {
  const styles: ViewStyle = { ...style };

  if (windowWidth) styles.width = windowWidthUtil;
  else if (width100) styles.width = "100%";
  else if (width) styles.width = width;

  if (height100) styles.height = "100%";
  else if (height) styles.height = height;

  if (flexRowCenter) Object.assign(styles, stylesBase.flexRowCenter);
  else if (flexRowSpaceBetCenter) Object.assign(styles, stylesBase.flexRowSpaceBetCenter);
  else if (flexRowStartCenter) Object.assign(styles, stylesBase.flexRowStartCenter);
  else if (flexRowEndCenter) Object.assign(styles, stylesBase.flexRowEndCenter);
  else if (flexColumnCenter) Object.assign(styles, stylesBase.flexColumnCenter);
  else if (flexColumnStartLeft) Object.assign(styles, stylesBase.flexColumnStartLeft);
  else if (flexColumnStartCenter) Object.assign(styles, stylesBase.flexColumnStartCenter);
  else if (flexColumnEndCenter) Object.assign(styles, stylesBase.flexColumnEndCenter);
  else if (flexColumnSpaceBetCenter) Object.assign(styles, stylesBase.flexColumnSpaceBetCenter);

  if (gap) styles.gap = gap;
  if (padding) styles.padding = padding;
  if (redBorder) Object.assign(styles, stylesBase.redBorder);

  return <View style={styles}>{children}</View>;
}