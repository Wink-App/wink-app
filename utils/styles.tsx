import { StyleSheet, Text, TextStyle } from "react-native";

export const colorPurple = "#5D2583";
export const colorOrange = "#FBB900";

export const colorWhite = "#FFFFFF";
export const colorBlack = "#000000";

export const colorGreyBackground = "#eeeeee";
export const colorGreyDarker = "#e8e8e8";
export const colorGreyLighter = "#f1f1f1";

export const secondaryText = "rgba(0, 0, 0, 0.5)";
export const secondaryTextLight = "rgba(255, 255, 255, 0.7)";

export const colorBorderLine = "#0000002a";

export const stylesBase = StyleSheet.create({
  fontBogartBold: {
    fontFamily: "Bogart-Bold-trial",
  },
  fontBogartMedium: {
    fontFamily: "Bogart-Medium-trial",
  },
  fontPoppinsBold: {
    fontFamily: "Poppins-SemiBold",
  },
  fontPoppinsRegular: {
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
  flexRowSpaceBetCen: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});

type TextUnderlinedProps = {
  children: React.ReactNode;
  style?: TextStyle;
};

export function TextUnderlined({ children, style = {} }: TextUnderlinedProps) {
  return (
    <Text
      style={{
        textDecorationLine: "underline",
        textDecorationColor: colorBorderLine,
        ...style,
      }}>
      {children}
    </Text>
  );
}
