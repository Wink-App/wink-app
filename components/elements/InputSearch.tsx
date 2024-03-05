import { useRef, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { MotiView } from "moti";

import { colorBorderLine, colorGreyDarker, colorGreyLighter, secondaryText, stylesBase } from "@/utils/styles";

import AppText from "../app/AppText";
import AppView from "../app/AppView";
import TransitionElement from "../transitions/TransitionElement";
import ExpoSvg from "./ExpoSvg";
import { AutoComplete, InputMode } from "./InputLabel";

type InputSearchProps = {
  value: string;
  placeholder?: string;
  inputMode?: InputMode;
  autoComplete?: AutoComplete;
  onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  clearFunction: () => void;
};

export default function InputSearch({
  value,
  placeholder = "Search",
  inputMode = "default",
  autoComplete = "off",
  onChange,
  clearFunction,
}: InputSearchProps) {
  const { container } = styles;

  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClose = () => {
    inputRef.current?.blur();
    clearFunction();
  };
  return (
    <AppView
      width100
      flexRowSpaceBetCenter>
      <MotiView
        animate={{ width: isFocused ? "82.75%" : "100%" }}
        transition={{
          type: "timing",
          duration: 150,
        }}
        style={container}>
        <ExpoSvg
          source={require("../../assets/icons/SearchInput.svg")}
          size={15}
          style={{ marginRight: 10 }}
        />
        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            height: 45,
            ...stylesBase.fontRegular,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={secondaryText}
          onChange={onChange}
          clearButtonMode="never"
          keyboardType={inputMode}
          spellCheck={false}
          clearTextOnFocus={false}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
              <ExpoSvg
                source={require("../../assets/icons/X.svg")}
                size={15}
              />
            </TouchableOpacity>
          </TransitionElement>
        )}
      </MotiView>

      {isFocused &&
        <TransitionElement>
          <TouchableOpacity onPress={handleClose}>
            <AppText mid secondary>Annulla</AppText>
          </TouchableOpacity>
        </TransitionElement>
      }
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...stylesBase.flexRowCenter,
    paddingHorizontal: 16,
    borderRadius: 9,
    backgroundColor: colorGreyLighter,
    borderColor: colorBorderLine,
    borderWidth: 0.5,
  },
});