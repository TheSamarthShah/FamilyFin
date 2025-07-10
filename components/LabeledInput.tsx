// components/LabeledInput.tsx
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
};

export default function LabeledInput({ label, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-muted dark:text-muted mb-1">{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="#9CA3AF"
        className="bg-surface text-black dark:text-white px-4 py-2 rounded-md border border-neutral"
      />
    </View>
  );
}
