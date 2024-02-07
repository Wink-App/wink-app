import { Keyboard, KeyboardAvoidingView, Platform, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type KeyboardProps = {
    children: JSX.Element | JSX.Element[];
    style?: ViewStyle;
};

export function DismissKeyboard({ children }: KeyboardProps) {
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
}

export function AvoidKeyboard({ children, style = {} }: KeyboardProps) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, ...style }}>
            {children}
        </KeyboardAvoidingView>
    );
}