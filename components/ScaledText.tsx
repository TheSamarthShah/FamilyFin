// components/ScaledText.tsx
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";

type Props = TextProps & {
  size: number;
  weight?: TextStyle["fontWeight"];
  color?: string;
  maxSize?: number;
  minSize?: number;
};

export default function ScaledText({
  size,
  weight = "normal",
  color = "#000",
  maxSize = 24,
  minSize = 12,
  style,
  children,
  ...rest
}: Props) {
  const scaled = moderateScale(size, 0.25); // 0.25 means gentle scaling
  const finalSize = Math.min(Math.max(scaled, minSize), maxSize);

  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: finalSize,
          fontWeight: weight,
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
