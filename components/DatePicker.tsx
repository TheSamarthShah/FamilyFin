// components/DatePicker.tsx
import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { CalendarDate } from "@internationalized/date";
import React, { useState } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button, Portal } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

// Convert JS Date to CalendarDate
const toCalendarDate = (date: Date | null): CalendarDate | undefined => {
  if (!date) return undefined;
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

// Convert CalendarDate to JS Date
const fromCalendarDate = (calendarDate: CalendarDate): Date => {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
};

interface Props {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  style,
  textStyle,
  minimumDate,
  maximumDate,
}: Props) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const formatDate = () => {
    if (!value) return placeholder;
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Convert props to CalendarDate format
  const calendarDate = value ? toCalendarDate(value) : undefined;
  const startDate = minimumDate ? toCalendarDate(minimumDate) : undefined;
  const endDate = maximumDate ? toCalendarDate(maximumDate) : undefined;

  return (
    <>
      <Button
        mode="outlined"
        onPress={showModal}
        style={[
          {
            backgroundColor: colors.bgSurface,
            borderColor: colors.textMuted,
            borderRadius: moderateScale(8),
            paddingHorizontal: scale(12),
            paddingVertical: verticalScale(10),
            justifyContent: "space-between",
          },
          style,
        ]}
        labelStyle={[
          {
            color: value ? colors.textPrimary : colors.textMuted,
            fontSize: scale(14),
            textAlign: "left",
          },
          textStyle,
        ]}
        icon="calendar"
      >
        {formatDate()}
      </Button>

      <Portal>
       <DatePickerModal
  mode="single"
  visible={visible}
  onDismiss={hideModal}
  onConfirm={({ date }) => {
    if (date) {
      onChange(fromCalendarDate(date));
    }
    hideModal();
  }}
  // Only spread date if defined
  {...(calendarDate ? { date: calendarDate } : {})}
  // Only spread validRange if one of the dates exist
  {...(startDate || endDate
    ? {
        validRange: {
          ...(startDate ? { startDate } : {}),
          ...(endDate ? { endDate } : {}),
        },
      }
    : {})}
  label="Select date"
  saveLabel="Confirm"
  animationType="slide"
  locale="en"
/>


      </Portal>
    </>
  );
}