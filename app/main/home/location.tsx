import { View } from "react-native";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";

import { TextBig } from "../../../utils/text/Text";

export default function Location() {

  return (
    <SafeAreaLayout>
      <View>
        <TextBig>Location</TextBig>
      </View>
    </SafeAreaLayout>
  );
}