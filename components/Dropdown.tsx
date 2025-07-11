// components/Dropdown.tsx
import { Colors } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

export type Option = { label: string; value: string };

interface Props {
  options: Option[];
  value: string | null | undefined;
  onChange: (item: Option) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Responsive, theme-aware Dropdown component using react-native-select-dropdown
 */
export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  style,
  textStyle,
}: Props) {
  const scheme = useColorScheme() ?? "light";
  const theme = Colors[scheme];
  const selectedIndex = options.findIndex((i) => i.value === value);

  return (
    <SelectDropdown
      data={options}
      defaultValueByIndex={selectedIndex >= 0 ? selectedIndex : undefined}
      onSelect={(selectedItem: Option) => onChange(selectedItem)}
      dropdownStyle={{
        backgroundColor: theme.bgSurface,
        borderRadius: moderateScale(8),
      }}
      dropdownOverlayColor="rgba(0,0,0,0.2)"
      renderButton={(selectedItem, isOpened) => (
        <TouchableOpacity
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.bgSurface,
              borderWidth: 1,
              borderColor: theme.textMuted,
              borderRadius: moderateScale(8),
              paddingHorizontal: scale(12),
              paddingVertical: verticalScale(10),
            },
            style,
          ]}
        >
          <Text
            style={[
              {
                flex: 1,
                color: selectedItem ? theme.textPrimary : theme.textMuted,
                fontSize: scale(14),
              },
              textStyle,
            ]}
          >
            {selectedItem?.label ?? placeholder}
          </Text>
          <Ionicons
            name={isOpened ? "chevron-up" : "chevron-down"}
            size={moderateScale(18)}
            color={theme.textMuted}
          />
        </TouchableOpacity>
      )}
      renderItem={(item, index, isSelected) => (
        <TouchableOpacity
          key={`${item.value}-${index}`}
          style={{
            backgroundColor: isSelected ? theme.bgLevel2 : theme.bgSurface,
            paddingVertical: verticalScale(10),
            paddingHorizontal: scale(12),
          }}
        >
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: scale(14),
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
