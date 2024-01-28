import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="email"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
