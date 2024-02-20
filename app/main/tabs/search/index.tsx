import { StyleSheet, Text, View } from "react-native";

import SafeAreaLayout from "@/appLayouts/SafeAreaLayout";

import { stylesBase } from "@/utils/styles";

export default function Search() {
  return (
    <SafeAreaLayout>
      <View
        style={{
          width: "100%",
          ...stylesBase.flexColumnCenter
        }}>
        <Text>Search</Text>
      </View>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({});