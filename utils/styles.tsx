import { StyleSheet, Text, TextStyle } from "react-native";

export const colorPurple = "#9262D2";
export const colorOrange = "#FFC24D";

export const colorWhite = "#FFFFFF";
export const colorBlack = "#000000";
export const colorGreen = "#34A853";

export const colorGreyBackground = "#eeeeee";
export const colorGreyDarker = "#e8e8e8";
export const colorGreyLighter = "#f1f1f1";

export const secondaryText = "rgba(0, 0, 0, 0.5)";
export const secondaryTextLight = "rgba(255, 255, 255, 0.7)";

export const colorBorderLine = "#0000002a";

export const stylesBase = StyleSheet.create({
  redBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colorBorderLine,
  },
  fontBogartBold: {
    fontFamily: "Bogart-Bold-trial",
  },
  fontBogartMedium: {
    fontFamily: "Bogart-Medium-trial",
  },
  fontBold: {
    fontFamily: "Poppins-SemiBold",
  },
  fontRegular: {
    fontFamily: "Poppins-Regular",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRowStartCenter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexRowStartBottom: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  flexRowSpaceBetCen: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowEndCenter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flexColumnCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexColumnStartLeft: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flexColumnStartCenter: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexColumnCenterLeft: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  flexColumnEndCenter: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flexColumnSpaceBetCen: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

type TextUnderlinedProps = {
  children: React.ReactNode;
  style?: TextStyle;
  onPress?: () => void;
};

export function TextUnderlined({
  children,
  style = {},
  onPress = () => { },
}: TextUnderlinedProps) {
  return (
    <Text
      onPress={onPress}
      style={{
        textDecorationLine: "underline",
        textDecorationColor: colorBorderLine,
        ...style,
      }}>
      {children}
    </Text>
  );
}

type TextBulletProps = {
  children: React.ReactNode;
  color?: TextStyle["color"];
  style?: TextStyle;
};

export function TextBullet({
  children,
  color,
  style = {},
}: TextBulletProps) {
  return (
    <Text style={{ ...stylesBase.fontRegular, color, ...style }}>
      &nbsp;•&nbsp;&nbsp;{children}
    </Text>
  );
}

type TextProps = {
  children: React.ReactNode;
  fontSize?: TextStyle["fontSize"];
  color?: TextStyle["color"];
};

export function TextBold({ children, fontSize, color }: TextProps) {
  const style = {
    ...stylesBase.fontBold,
    fontSize,
    color,
  };
  return <Text style={style}>{children}</Text>;
}