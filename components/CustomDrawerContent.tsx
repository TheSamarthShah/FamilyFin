import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";

type DrawerItemConfig = {
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  const drawerItems: DrawerItemConfig[] = [
    {
      label: "Dashboard",
      route: "/(drawer)/(tabs)", // Must match your route structure
      icon: "home-outline",
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.drawer, { backgroundColor: palette.bgPrimary }]}
    >
      {drawerItems.map(({ label, icon, route }) => {
        const isActive = pathname === route;

        return (
          <DrawerItem
            key={route}
            label={label}
            icon={({ size }) => (
              <Ionicons
                name={icon}
                size={size}
                color={isActive ? palette.textAccent : palette.textMuted}
              />
            )}
            labelStyle={{
              color: isActive ? palette.textAccent : palette.textMuted,
              fontWeight: "500",
              marginLeft: -10,
              fontSize: 14,
            }}
            style={{
              backgroundColor: isActive ? palette.bgSurfaceVariant : "transparent",
              borderRadius: 6,
              marginHorizontal: 8,
            }}
            onPress={() => {
              if (pathname !== route) {
                router.push(route as any);
              }
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

const styles = ScaledSheet.create({
  drawer: {
    flex: 1,
  },
});
