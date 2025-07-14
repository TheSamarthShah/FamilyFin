import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";

interface NavbarProps {
  title?: string;
  onMenuPress?: () => void;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const Navbar: React.FC<NavbarProps> = ({
  title = "My App",
  onMenuPress,
  rightElement,
  containerStyle,
  titleStyle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top},
        containerStyle,
      ]}
    >
      <TouchableOpacity onPress={onMenuPress} style={styles.menu}>
        <Ionicons name="menu" size={24} color="#111827" />
      </TouchableOpacity>

      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.right}>{rightElement || <View style={styles.placeholder} />}</View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "12@s",
    backgroundColor: "#fff",
  },
  menu: {
    width: "36@ms",
    height: "30@ms",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "17@ms",
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
  right: {
    width: "36@ms",
    height: "30@ms",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: "36@ms",
    height: "36@ms",
  },
});

export default Navbar;
