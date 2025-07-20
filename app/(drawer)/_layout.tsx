import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function DrawerLayout() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  return (
    <Drawer
      screenOptions={{
         headerTintColor: palette.textPrimary,
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: palette.bgPrimary,
          borderBottomWidth: scale(0.5),
          borderBottomColor: palette.borderMuted || "#ccc",
          elevation: 0,
          shadowColor: "transparent",
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        },
        headerTitleStyle: {
          fontSize: moderateScale(16),
          fontWeight: "600",
          color: palette.textPrimary,
        },
        drawerStyle: {
          width: scale(220),
          backgroundColor: palette.bgPrimary,
        },
        drawerActiveTintColor: palette.textAccent, // Bright, noticeable text
        drawerInactiveTintColor: palette.textPrimary, // Normal text, but visible on dark bg
        drawerLabelStyle: {
          fontSize: moderateScale(14),
          color: palette.textPrimary, // This is important for manual override
        },
        drawerItemStyle: {
          marginVertical: verticalScale(4),
        },
      }}
    >
      <Drawer.Screen
        name="(quickadd)"
        options={{
          title: "Quick Add",
          drawerIcon: ({ color }) => (
            <Ionicons
              name="add-circle-outline"
              size={moderateScale(20)}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="(asset)"
        options={{
          title: "Asset Management",
          drawerIcon: ({ color }) => (
            <Ionicons
              name="wallet-outline"
              size={moderateScale(20)}
              color={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}
