// components/DatePicker.tsx
import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: any;
  minimumDate?: Date;
  maximumDate?: Date;
  dateFormat?: (date: Date) => string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  style,
  textStyle,
  minimumDate = new Date(2000, 0, 1),
  maximumDate = new Date(2030, 11, 31),
  dateFormat = (date) => date.toLocaleDateString(),
}: Props) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const [showPicker, setShowPicker] = useState(false);

  const handleQuickSelect = (daysOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    onChange(date);
  };

  return (
    <View>
      {/* Date Input Field */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[
          styles.dateInput,
          {
            backgroundColor: colors.bgSurfaceVariant,
            borderColor: colors.bgLevel2,
          },
          style,
        ]}
      >
        <Text
          style={[
            styles.dateText,
            {
              color: value ? colors.textPrimary : colors.textMuted,
            },
            textStyle,
          ]}
        >
          {value ? dateFormat(value) : dateFormat(new Date())}
        </Text>
      </TouchableOpacity>

      {/* Quick Action Buttons */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          onPress={() => handleQuickSelect(-2)}
          style={[
            styles.quickActionButton,
            { backgroundColor: colors.bgLevel2 }
          ]}
        >
          <Text style={[styles.quickActionText, { color: colors.textPrimary }]}>
            B/F Yest.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleQuickSelect(-1)}
          style={[
            styles.quickActionButton,
            { backgroundColor: colors.bgLevel2 }
          ]}
        >
          <Text style={[styles.quickActionText, { color: colors.textPrimary }]}>
            Yest.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleQuickSelect(0)}
          style={[
            styles.quickActionButton,
            { backgroundColor: colors.bgLevel2 }
          ]}
        >
          <Text style={[styles.quickActionText, { color: colors.textPrimary }]}>
            Today
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          themeVariant={theme === 'dark' ? 'dark' : 'light'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    justifyContent: 'center' as const, // Explicitly typed as allowed value
  },
  dateText: {
    fontSize: scale(15),
  },
  quickActions: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-start' as const,
    marginTop: moderateScale(8),
    gap: moderateScale(8),
  },
  quickActionButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
  },
  quickActionText: {
    fontSize: scale(12),
  },
});