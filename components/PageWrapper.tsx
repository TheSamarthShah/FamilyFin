import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

type PageWrapperProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  safeAreaTop?: boolean;
} & Omit<ScrollViewProps, "contentContainerStyle">;

export default function PageWrapper({
  children,
  scrollable = false,
  style = {},
  contentContainerStyle = {},
  safeAreaTop = true,
  ...rest
}: PageWrapperProps) {
  const { theme } = useThemeContext();
  const c = Colors[theme];

  const Wrapper = scrollable ? ScrollView : View;

  const baseStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: moderateScale(24),
    backgroundColor: c.bgPrimary,
    ...(style || {}),
  };

  const containerPaddingTop = safeAreaTop ? verticalScale(40) : 0;

  if (scrollable) {
    return (
      <ScrollView
        {...rest}
        style={baseStyle}
        contentContainerStyle={[
          { paddingTop: containerPaddingTop },
          contentContainerStyle,
        ]}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View {...rest} style={baseStyle}>
      {children}
    </View>
  );
}
