import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import {
    ScrollView,
    ScrollViewProps,
    View,
    ViewStyle
} from "react-native";

type PageWrapperProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  safeAreaTop?: boolean;
  className?: string;
  contentClassName?: string;
} & Omit<ScrollViewProps, "contentContainerStyle">;

export default function PageWrapper({
  children,
  scrollable = false,
  style = {},
  contentContainerStyle = {},
  safeAreaTop = true,
  className = "",
  contentClassName = "",
  ...rest
}: PageWrapperProps) {
  const { theme } = useThemeContext();
  const bg = theme === "dark" ? "bg-background-dark" : "bg-background";
  const Wrapper = scrollable ? ScrollView : View;

  if (scrollable) {
    return (
      <ScrollView
        {...rest}
        className={`flex-1 px-6 ${bg} ${className}`}
        style={style}
        contentContainerStyle={[
          { paddingTop: safeAreaTop ? 40 : 0 },
          contentContainerStyle,
        ]}
      >
        <View className={contentClassName}>{children}</View>
      </ScrollView>
    );
  }

  return (
    <View {...rest} className={`flex-1 px-6 ${bg} ${className}`} style={style}>
      {children}
    </View>
  );
}
