// app/_layout.tsx
import { Colors } from "@/colors";
import Navbar from "@/components/navbar";
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
        header: () => <Navbar title="My App" />, // Our custom Navbar
        tabBarActiveTintColor: palette.textAccent,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = ScaledSheet.create({
  tabBar: {
    backgroundColor: Colors.light.bgSurface,
    borderTopWidth: 0,
    height: "60@vs",
    paddingBottom: "10@vs",
    paddingTop: "5@vs",
  },
  tabLabel: {
    fontSize: "12@s",
  },
});
