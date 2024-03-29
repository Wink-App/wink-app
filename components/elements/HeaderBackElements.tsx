import React from "react";
import { View } from "react-native";

import AppView from "@/components/app/AppView";

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
    <AppView width100 flexRowSpaceBetCenter paddingHorizontal={padding ? 20 : 0}>
      <ButtonBack />
      {children}
      {isSingleChild && center && <View style={{ width: 25 }} />}
    </AppView>
  );
}