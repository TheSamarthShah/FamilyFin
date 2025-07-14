// app/(tabs)/_layout.tsx
import { Colors } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export default function TabLayout() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];

  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: palette.textAccent,
          tabBarInactiveTintColor: palette.textMuted,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="password"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="key-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
  );
}

const styles = ScaledSheet.create({
  tabBar: {
    backgroundColor: Colors.light.bgSurface,
  },
  tabLabel: {
    fontSize: "12@s",
  },
});