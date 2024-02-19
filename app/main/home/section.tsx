import { View } from "react-native";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";

import { TextBig } from "../../../utils/text/Text";

import { useHome } from "./_layout";

export default function Section() {

  const { selectedSection } = useHome();

  return (
    <SafeAreaLayout>
      <View>
        <TextBig>{selectedSection.name}</TextBig>
      </View>
    </SafeAreaLayout>
  );
}