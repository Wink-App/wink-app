import React from "react";
import { View } from "react-native";

import { stylesBase } from "@/utils/styles";

import { ButtonBack } from "./Button";

type HeaderBackElementsProps = {
  children: JSX.Element[] | JSX.Element;
  center?: boolean;
  padding?: boolean;
};

export function HeaderBackElements({
  children,
  center = false,
  padding = false,
}: HeaderBackElementsProps) {
  const childrenArray = React.Children.toArray(children);
  const isSingleChild = childrenArray.length === 1;
  return (
    <View
      style={{
        width: "100%",
        ...stylesBase.flexRowSpaceBetCen,
        paddingHorizontal: padding ? 20 : 0,
      }}>
      <ButtonBack />
      {children}
      {isSingleChild && center && <View style={{ width: 25 }} />}
    </View>
  );
}