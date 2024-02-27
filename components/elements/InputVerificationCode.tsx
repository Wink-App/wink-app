import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import AppView from "@/appLayouts/AppView";

import { colorBorderLine, colorGreyLighter, stylesBase } from "../../utils/styles";

type InputVerificationCodeProps = {
  maxValueChar: number;
  isInvalidChar?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
};

export function InputVerificationCode({
  maxValueChar = 6,
  isInvalidChar = false,
  autoFocus = false,
  onChange,
}: InputVerificationCodeProps) {
  const inputRefs = useRef<(TextInput | null)[]>(Array.from({ length: maxValueChar }, () => null));
  const [values, setValues] = useState<string[]>(Array.from({ length: maxValueChar }, () => ""));

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 800);
    }
  }, [autoFocus]);

  const handleChangeText = (index: number, text: string) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
    onChange?.(newValues.join(""));
    if (text && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === "Backspace") {
      if (!values[index] && inputRefs.current[index - 1]) {
        if (values[index - 1]) {
          const newValues = [...values];
          newValues[index - 1] = "";
          setValues(newValues);
        }
        inputRefs.current[index - 1]?.focus();
      } else {
        const newValues = [...values];
        newValues[index] = "";
        setValues(newValues);
      }
    }
  };

  return (
    <AppView width100 flexRowSpaceBetCenter>
      {Array.from({ length: maxValueChar }, (_, i) => {
        const [isFocused, setIsFocused] = useState(false);
        return (
          <AppView
            key={i}
            width={45}
            height={45}
            flexRowCenter
            borderRadius={9}
            backgroundColor={colorGreyLighter}
            style={{
              borderColor: isInvalidChar ? "red" : (
                isFocused ? "black" : colorBorderLine),
              borderWidth: 0.5,
            }}>
            <TextInput
              ref={(ref: TextInput) => (inputRefs.current[i] = ref)}
              style={{
                width: 45,
                height: 45,
                ...stylesBase.fontRegular,
                textAlign: "center",
              }}
              value={values[i]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={text => handleChangeText(i, text)}
              onKeyPress={event => handleKeyPress(i, event)}
              maxLength={1}
              keyboardType="number-pad"
              returnKeyType="next"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              caretHidden
            />
          </AppView>
        );
      })}
    </AppView>
  );
}