import { Colors } from "@/colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type ToastType = "success" | "error" | "warning" | "info";

type ToastProps = {
  message: string;
  type?: ToastType;
  sticky?: boolean;
  onClose?: () => void;
};

export default function ToastComponent({
  message,
  type = "info",
  sticky = true,
  onClose,
}: ToastProps) {
  const scheme = useColorScheme() ?? "light";
  const theme = Colors[scheme];
  const opacity = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(true);

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose?.();
    });
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (!sticky) {
      const timer = setTimeout(fadeOut, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const backgroundColor = {
    success: theme.income,
    error: theme.textDanger,
    warning: theme.warning,
    info: theme.textAccent,
  }[type];

  const containerStyle: Animated.WithAnimatedObject<ViewStyle> = {
    position: "absolute",
    top: verticalScale(50),
    left: scale(20),
    right: scale(20),
    backgroundColor,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    opacity,
    zIndex: 9999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  };

  return (
    <Animated.View style={containerStyle}>
      <Text
        style={{
          color: theme.textOnPrimary,
          fontWeight: "bold",
          flex: 1,
          fontSize: moderateScale(14),
        }}
      >
        {message}
      </Text>
      <TouchableOpacity onPress={fadeOut}>
        <Text
          style={{
            color: theme.textOnPrimary,
            fontWeight: "bold",
            marginLeft: scale(12),
            fontSize: moderateScale(16),
          }}
        >
          ✕
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
