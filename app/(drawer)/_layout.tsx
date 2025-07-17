import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { scale } from "react-native-size-matters";

export default function DrawerLayout() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];
  return (
    <Drawer
      screenOptions={{
        headerStatusBarHeight: 0 ,
        headerStyle: {
          backgroundColor: palette.bgPrimary,
          borderBottomWidth: 1,
          borderBottomColor: palette.borderMuted || "#ccc",

          elevation: 0, // Android
          shadowColor: "transparent",
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        },
        headerTitleStyle: {
          fontSize: scale(16),
          fontWeight: "600",
          alignSelf: "center",
        },
        drawerStyle: {
          width: scale(200),
        },
        drawerActiveTintColor: "#2e7d32",
        drawerLabelStyle: {
          fontSize: scale(14),
        },
        drawerItemStyle: {
          marginVertical: scale(4),
        },
      }}
    >
      <Drawer.Screen
        name="(quickadd)"
        options={{
          title: "Quick Add",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={scale(20)} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(asset)"
        options={{
          title: "Asset Management",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={scale(20)} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
