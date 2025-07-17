// app/(tabs)/_layout.tsx
import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";

export default function TabLayout() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  const styles = ScaledSheet.create({
    tabBar: {
      backgroundColor: palette.bgPrimary,
      height: "50@vs",
      borderTopWidth: 1,
      borderTopColor: palette.borderMuted || "#ccc",

      elevation: 0, // Android
      shadowColor: "transparent",
      shadowOpacity: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 0,

      paddingBottom: 0,
      paddingTop: 0,
    },
    tabLabel: {
      fontSize: "11@ms",
    },
  });

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
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="password"
        options={{
          title: "Passwords",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="key-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
