import React from "react";
import { ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import AppView from "@/appLayouts/AppView";

import { SetState } from "@/context/types/types";

import { colorGreyBackground } from "@/utils/styles";

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
      <AppView
        width100
        height="45%"
        flexColumnStartLeft
        gap={20}
        paddingTop={25}
        padding={20}
        backgroundColor={colorGreyBackground}
        style={{
          position: "absolute",
          bottom: 0,
          ...style,
        }}>
        <AppView width100 flexRowSpaceBetCenter>
          {ModalTitle}
          <TouchableOpacity onPress={handleClose}>
            <ExpoSvg
              source={require("@/assets/icons/X.svg")}
              size={25}
            />
          </TouchableOpacity>
        </AppView>
        {children}
      </AppView>
    </Modal>
  );
}