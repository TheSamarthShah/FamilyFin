// InputSelect.tsx
import { Colors } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";

type Option = {
  label: string;
  value: string;
};

interface InputSelectProps {
  value: string;
  onChange: (value: string) => void;
  selectedOption: Option;
  onSelect: (option: Option) => void;
  options: Option[];
  placeholder?: string;
  style?: any;
}

export default function InputSelect({
  value,
  onChange,
  selectedOption,
  onSelect,
  options,
  placeholder = "Enter value",
  style,
}: InputSelectProps) {
  const scheme = useColorScheme() ?? "light";
  const theme = Colors[scheme];
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<View>(null);
  const selectBoxRef =
    useRef<React.ComponentRef<typeof TouchableOpacity>>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const measureDropdownPosition = () => {
    if (selectBoxRef.current) {
      selectBoxRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({
          left: x,
          top: y + height + verticalScale(4),
          width: width,
        });
      });
    }
  };

  useEffect(() => {
    if (showDropdown) {
      measureDropdownPosition();
    }
  }, [showDropdown]);

  const handleSelect = (opt: Option) => {
    onSelect(opt);
    setShowDropdown(false);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgSurface }, style]}>
      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        keyboardType="default"
        style={[
          styles.input, 
          { 
            color: theme.textPrimary,
            backgroundColor: theme.bgSurfaceVariant,
            borderColor: theme.bgLevel2
          }
        ]}
        numberOfLines={1}
      />

      {/* Select Box */}
      <TouchableOpacity
        ref={selectBoxRef}
        onPress={() => setShowDropdown((prev) => !prev)}
        style={[
          styles.selectBox, 
          { 
            backgroundColor: theme.bgSurfaceVariant,
            borderColor: theme.bgLevel2
          }
        ]}
      >
        <Text 
          style={[styles.selectText, { color: theme.textPrimary }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedOption.label}
        </Text>
        <Ionicons
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={moderateScale(16)}
          color={theme.textMuted}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        
        <View
          ref={dropdownRef}
          style={[
            styles.dropdown,
            { 
              backgroundColor: theme.bgSurface,
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              minWidth: dropdownPosition.width,
              borderColor: theme.bgLevel2,
            },
          ]}
        >
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => handleSelect(opt)}
              style={[
                styles.dropdownItem,
                {
                  backgroundColor:
                    selectedOption.value === opt.value
                      ? theme.bgLevel2
                      : theme.bgSurface,
                  borderBottomColor: theme.bgLevel2,
                },
              ]}
            >
              <Text 
                style={[styles.dropdownItemText, { color: theme.textPrimary }]}
                numberOfLines={1}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(8),
    overflow: "hidden",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateVerticalScale(10),
    fontSize: moderateScale(15),
    marginRight: moderateScale(8),
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateVerticalScale(10),
    minWidth: moderateScale(100),
  },
  selectText: {
    fontSize: moderateScale(15),
    flexShrink: 1,
  },
  chevronIcon: {
    marginLeft: moderateScale(8),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  dropdown: {
    position: "absolute",
    borderWidth: 1,
    borderRadius: moderateScale(8),
    zIndex: 1000,
    maxHeight: Dimensions.get("window").height * 0.4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: moderateScale(15),
  },
});