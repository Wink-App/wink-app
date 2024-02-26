import React from "react";
import { View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import { SetState } from "@/context/types/types";

import { colorGreyBackground, stylesBase } from "@/utils/styles";

import ExpoSvg from "../elements/ExpoSvg";

type ExpoModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: SetState<boolean>;
  style?: ViewStyle;
};

export function ModalBottomHalf({
  children,
  isVisible,
  setIsVisible,
  style = {},
}: ExpoModalProps) {
  const ModalTitle = React.Children.toArray(children)[0];
  children = React.Children.toArray(children).slice(1);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleClose}
      swipeDirection="down"
      onSwipeComplete={handleClose}
      style={{ margin: 0 }}>
      <View
        style={{
          width: "100%",
          height: "45%",
          ...stylesBase.flexColumnStartLeft,
          gap: 20,
          backgroundColor: colorGreyBackground,
          paddingTop: 25,
          padding: 20,
          position: "absolute",
          bottom: 0,
          ...style,
        }}>
        <View
          style={{
            width: "100%",
            ...stylesBase.flexRowSpaceBetCen,
          }}>
          {ModalTitle}
          <TouchableOpacity onPress={handleClose}>
            <ExpoSvg
              source={require("@/assets/icons/X.svg")}
              size={25}
            />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}