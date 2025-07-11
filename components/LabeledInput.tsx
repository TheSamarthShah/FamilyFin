import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

type Props = TextInputProps & {
  label: string;
};

export default function LabeledInput({ label, ...props }: Props) {
  const { theme } = useThemeContext();
  const c = Colors[theme];

  return (
    <View style={{ marginBottom: verticalScale(16) }}>
      <Text
        style={{
          color: c.textMuted,
          marginBottom: verticalScale(4),
          fontSize: scale(14),
        }}
      >
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor={c.textMuted}
        style={{
          backgroundColor: c.bgSurface,
          color: c.textPrimary,
          paddingVertical: verticalScale(8),
          paddingHorizontal: scale(16),
          borderRadius: moderateScale(8),
          borderWidth: 1,
          borderColor: c.textNeutral,
          fontSize: scale(15),
        }}
      />
    </View>
  );
}
