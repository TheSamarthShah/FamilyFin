import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

interface NavbarProps {
  onMenuPress?: () => void;
  containerStyle?: ViewStyle;
  iconColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onMenuPress,
  containerStyle,
  iconColor = "#111827",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        containerStyle,
      ]}
    >
      <TouchableOpacity onPress={onMenuPress} style={styles.menu}>
        <Ionicons name="menu" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "12@s",
    paddingBottom: "8@vs",
    backgroundColor: "#fff",
  },
  menu: {
    width: "36@ms",
    height: "30@ms",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default Navbar;
