import { StyleSheet, Text, View } from "react-native";

import SafeAreaLayout from "@/appLayouts/SafeAreaLayout";

import { stylesBase } from "@/utils/styles";

export default function Favourites() {
  return (
    <SafeAreaLayout>
      <View
        style={{
          width: "100%",
          ...stylesBase.flexColumnCenter
        }}>
        <Text>Favourites</Text>
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({});