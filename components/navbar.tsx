import React from "react";
import { Image, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScaledSheet, scale } from "react-native-size-matters";

interface NavbarProps {
  title?: string;
  avatarUri?: string;
  onAvatarPress?: () => void;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const Navbar: React.FC<NavbarProps> = ({
  title = "My App",
  avatarUri = "https://i.pravatar.cc/150?img=3",
  onAvatarPress,
  rightElement,
  containerStyle,
  titleStyle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + scale(10) }, containerStyle]}>
      <TouchableOpacity onPress={onAvatarPress}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
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
    paddingHorizontal: "16@s",
    backgroundColor: "#fff",
  },
  avatar: {
    width: "36@ms",
    height: "36@ms",
    borderRadius: "18@ms",
  },
  title: {
    fontSize: "18@ms",
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
  right: {
    width: "36@ms",
    height: "36@ms",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: "36@ms",
    height: "36@ms",
  },
});

export default Navbar;