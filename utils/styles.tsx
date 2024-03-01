import { StyleSheet } from "react-native";

import { windowWidth as windowWidthUtil } from "@/utils/utils";

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
  windowWidth: {
    width: windowWidthUtil,
  },
  width100: {
    width: "100%",
  },
  height100: {
    height: "100%",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRowSpaceBetCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowStartCenter: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  flexColumnEndCenter: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flexColumnSpaceBetCenter: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundColorPurple: {
    backgroundColor: colorPurple,
  },
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
  fontSizeSmall: {
    fontSize: 12,
  },
  fontSizeMid: {
    fontSize: 14,
  },
  fontSizeBig: {
    fontSize: 16,
  },
  colorSecondaryText: {
    color: secondaryText,
  },
  colorSecondaryTextLight: {
    color: secondaryTextLight,
  },
  underlineText: {
    textDecorationLine: "underline",
    textDecorationColor: colorBorderLine,
  },
});

export function Bullet() {
  return <>&nbsp;•&nbsp;&nbsp;</>;
}