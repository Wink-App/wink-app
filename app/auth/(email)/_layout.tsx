import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="email"
      />
      <Stack.Screen
        name="password"
      />
      <Stack.Screen
        name="forgot"
      />
      <Stack.Screen
        name="check"
      />
    </Stack>
  );
}
