import { StyleSheet, Text, View } from "react-native";

import SafeAreaLayout from "../../../appLayouts/SafeAreaLayout";

import { stylesBase } from "../../../utils/styles";

export default function Home() {
  return (
    <SafeAreaLayout>
      <View
        style={{
          width: "100%",
          ...stylesBase.flexColumnCenter
        }}>
        <Text>Home</Text>
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({});