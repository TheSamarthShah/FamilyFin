import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, ViewStyle } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

type ToastProps = {
  message: string;
  type?: ToastType;
  sticky?: boolean; // New prop: defaults to false
  onClose?: () => void; // Optional callback when toast is dismissed
};

const COLORS: Record<ToastType, string> = {
  success: "#16A34A",
  error: "#DC2626",
  warning: "#CA8A04",
  info: "#2563EB",
};

export default function ToastComponent({
  message,
  type = "info",
  sticky = true,
  onClose,
}: ToastProps) {
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

  const containerStyle: Animated.WithAnimatedObject<ViewStyle> = {
    position: "absolute",
    top: 50, // 👆 shown at the top now
    left: 20,
    right: 20,
    backgroundColor: COLORS[type],
    padding: 12,
    borderRadius: 8,
    opacity,
    zIndex: 9999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Animated.View style={containerStyle}>
      <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>
        {message}
      </Text>
      <TouchableOpacity onPress={fadeOut}>
        <Text style={{ color: "white", fontWeight: "bold", marginLeft: 12 }}>
          ✕
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
