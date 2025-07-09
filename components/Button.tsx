import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  intent?: "primary" | "accent" | "danger" | "warning" | "muted" | "neutral" | "secondary";
  className?: string;
  textClassName?: string;
};

const intentClassMap = {
  primary: "bg-primary dark:bg-primary-dark text-white",
  accent: "bg-accent dark:bg-accent text-white",
  danger: "bg-danger dark:bg-danger text-white",
  warning: "bg-warning dark:bg-warning text-black",
  muted: "bg-muted dark:bg-muted text-white",
  neutral: "bg-neutral dark:bg-surface text-black dark:text-white",
  secondary: "bg-surface border border-neutral text-black dark:text-white",
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
  const base = intentClassMap[intent] || intentClassMap["primary"];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`px-4 py-3 rounded-md items-center justify-center ${base} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {loading ? (
        <View className="flex-row items-center space-x-2">
          <ActivityIndicator color="#fff" size="small" />
          <Text className={`font-semibold ${textClassName}`}>Loading...</Text>
        </View>
      ) : (
        <Text className={`font-semibold ${textClassName}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
