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
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
  const selectBoxRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

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
      {/* Select Box - Added numberOfLines and ellipsizeMode to prevent wrapping */}
      <TouchableOpacity
        ref={selectBoxRef}
        onPress={() => setShowDropdown((prev) => !prev)}
        style={[styles.selectBox, { borderColor: theme.textMuted }]}
      >
        <Text 
          style={{ 
            color: theme.textPrimary, 
            fontSize: scale(14),
            flexShrink: 1  // Prevent text from forcing the container to grow
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedOption.label}
        </Text>
        <Ionicons
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={moderateScale(16)}
          color={theme.textMuted}
          style={{ marginLeft: scale(4) }}
        />
      </TouchableOpacity>

      {/* Input - Added numberOfLines to prevent wrapping */}
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
            flex: 1,
          }
        ]}
        numberOfLines={1}
      />

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
              width: dropdownPosition.width,
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
                },
              ]}
            >
              <Text style={{ color: theme.textPrimary, fontSize: scale(14) }}>
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
    borderWidth: 1,
    borderRadius: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    position: "relative",
    zIndex: 1,
    overflow: 'hidden', // Prevent content from overflowing
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(8),
    borderRightWidth: 1,
    paddingRight: scale(8),
    flexShrink: 1, // Prevent from growing too large
    maxWidth: '40%', // Limit width of select box
  },
  input: {
    fontSize: scale(14),
    padding: 0, // Remove default padding
    margin: 0, // Remove default margins
    flexShrink: 1, // Allow to shrink if needed
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: "absolute",
    borderWidth: 1,
    borderRadius: moderateScale(6),
    zIndex: 1000, // Very high z-index to ensure it's above everything
    maxHeight: Dimensions.get('window').height * 0.4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
  },
});