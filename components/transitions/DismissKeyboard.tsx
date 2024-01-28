import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type DismissKeyboardProps = {
  children: JSX.Element;
};

export default function DismissKeyboard({ children }: DismissKeyboardProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}