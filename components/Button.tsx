// components/Button.tsx

import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  intent?:
    | "primary"
    | "accent"
    | "danger"
    | "warning"
    | "muted"
    | "neutral"
    | "secondary";
  className?: string;
  textClassName?: string;
};

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  intent = "primary",
  className = "",
  textClassName = "",
}: ButtonProps) {
  const { theme } = useThemeContext();
  const currentTheme = Colors[theme];

  const bgColorMap: Record<string, string> = {
    primary: currentTheme.textAccent,
    accent: currentTheme.income,
    danger: currentTheme.textDanger,
    warning: currentTheme.warning,
    muted: currentTheme.textMuted,
    neutral: currentTheme.textNeutral,
    secondary: currentTheme.bgSurface,
  };

  const textColorMap: Record<string, string> = {
    primary: currentTheme.textOnPrimary,
    accent: currentTheme.textOnPrimary,
    danger: currentTheme.textOnPrimary,
    warning: currentTheme.textOnPrimary,
    muted: currentTheme.textOnPrimary,
    neutral: currentTheme.textOnSurface,
    secondary: currentTheme.textOnSurface,
  };

  const backgroundColor = bgColorMap[intent] || currentTheme.textAccent;
  const textColor = textColorMap[intent] || currentTheme.textOnPrimary;

  const styles = StyleSheet.create({
    button: {
      backgroundColor,
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(16),
      borderRadius: moderateScale(8),
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.5 : 1,
    } as ViewStyle,
    text: {
      color: textColor,
      fontSize: scale(14),
      fontWeight: "500",
    } as TextStyle,
    loadingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(8),
    } as ViewStyle,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={styles.button}
      className={className}
    >
      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={textColor} size="small" />
          <Text style={styles.text} className={textClassName}>
            Loading...
          </Text>
        </View>
      ) : (
        <Text style={styles.text} className={textClassName}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
