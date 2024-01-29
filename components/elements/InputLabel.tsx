import { Image } from "expo-image";

import { useEffect, useRef } from "react";
import { NativeSyntheticEvent, Text, TextInputChangeEventData, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import {
  colorBorderLine,
  colorGreyDarker,
  colorGreyLighter,
  secondaryText,
  stylesBase,
} from "../../utils/styles";

import TransitionElement from "../transitions/TransitionElement";

type InputMode = "default" | "email-address" | "numeric" | "phone-pad";

type InputLabelProps = {
  widthValue?: string;

  label?: string | null;
  value: string;
  maxValueChar?: number | null;
  placeholder?: string | null;

  isPassword?: boolean;
  isPhoneNumber?: boolean;
  // isUsername?: boolean;
  // isSearch?: boolean;
  // isDescription?: boolean;
  // isOptional?: boolean;
  // Element?: JSX.Element | null;

  inputmode?: InputMode;

  autoFocus?: boolean;

  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  // onChangeDesc?: ;
  clearFunction?: () => void | null;
};

export default function InputLabel({
  label,
  value,
  maxValueChar,
  placeholder,
  isPassword = false,
  isPhoneNumber = false,
  inputmode = "default",
  autoFocus = false,
  onChange,
  clearFunction,
}: InputLabelProps) {

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 800);
    }
  }, [autoFocus]);

  return (
    <View
      style={{
        ...stylesBase.flexColumnStartLeft,
      }}>
      {label && (
        <Text
          style={{
            fontSize: 14,
            lineHeight: 21,
            marginLeft: 3,
            marginBottom: 3,
            color: secondaryText,
          }}>
          {label}
        </Text>
      )}

      <View
        style={{
          paddingHorizontal: 16,
          borderRadius: 9,
          backgroundColor: colorGreyLighter,
          borderColor: colorBorderLine,
          borderWidth: 0.5,
          ...stylesBase.flexRowCenter,
        }}>
        {isPhoneNumber && (
          <Text
            style={{
              fontSize: 14,
              lineHeight: 21,
              marginRight: 5,
              color: secondaryText,
            }}>
            +39
          </Text>
        )}

        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            height: 45,
            ...stylesBase.fontPoppinsRegular,
          }}
          value={value}
          maxLength={maxValueChar}
          placeholder={placeholder}
          placeholderTextColor={secondaryText}
          onChange={onChange}
          clearButtonMode="never"
          keyboardType={inputmode}
          secureTextEntry={isPassword}
          spellCheck={false}
        // autoCorrect={false}
        />

        {clearFunction && value && (
          <TransitionElement>
            <TouchableOpacity
              style={{
                height: 25,
                width: 25,
                ...stylesBase.flexRowCenter,
                backgroundColor: colorGreyDarker,
                borderRadius: 20,
              }}
              onPress={clearFunction}>
              <Image
                source={require("../../assets/icons/X.svg")}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          </TransitionElement>
        )}
      </View>
    </View>
  );
}