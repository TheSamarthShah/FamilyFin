import { Colors } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

export type Option = { label: string; value: string };

interface Props {
  options: Option[];
  value: string | null;
  onChange: (item: Option) => void;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const scheme = useColorScheme() ?? "light";
  const theme = Colors[scheme];

  const selected = options.find((opt) => opt.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.bgSurface,
            borderColor: theme.textMuted,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={{
            color: selected ? theme.textPrimary : theme.textMuted,
            fontSize: scale(14),
            flex: 1,
          }}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={moderateScale(18)} color={theme.textMuted} />
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={[styles.dropdown, { backgroundColor: theme.bgSurface }]}>
            {/* Sticky Search */}
            <View
              style={{
                padding: scale(12),
                borderBottomWidth: 1,
                borderBottomColor: theme.bgLevel2,
                backgroundColor: theme.bgSurface,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="search" size={moderateScale(18)} color={theme.textMuted} />
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search..."
                  placeholderTextColor={theme.textMuted}
                  style={{
                    flex: 1,
                    marginLeft: scale(8),
                    color: theme.textPrimary,
                    fontSize: scale(14),
                  }}
                  autoFocus
                />
              </View>
            </View>

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: verticalScale(12),
                    paddingHorizontal: scale(16),
                    borderBottomWidth: 1,
                    borderBottomColor: theme.bgLevel2,
                  }}
                  onPress={() => {
                    onChange(item);
                    setModalVisible(false);
                    setSearchText("");
                  }}
                >
                  <Text style={{ color: theme.textPrimary, fontSize: scale(14) }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: verticalScale(250) }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  dropdown: {
    borderRadius: moderateScale(8),
    overflow: "hidden",
  },
});
