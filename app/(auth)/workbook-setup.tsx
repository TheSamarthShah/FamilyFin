import { Colors } from "@/colors";
import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import PageWrapper from "@/components/PageWrapper";
import ScaledText from "@/components/ScaledText";
import { useLoading } from "@/context/LoadingContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Checkbox } from "react-native-paper";
import { moderateVerticalScale } from "react-native-size-matters";

export default function WorkbookSetup() {
  const [sheetId, setSheetId] = useState("");
  const [customScriptUrl, setCustomScriptUrl] = useState("");
  const [useCustomScript, setUseCustomScript] = useState(false);

  const { isLoading, setLoading } = useLoading();
  const { showToast } = useToast();
  const { theme } = useThemeContext();
  const color = Colors[theme];
  const router = useRouter();

  const DEFAULT_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyKTnmRcEARDo7tZKuuv-L49WooGsUiq55xCENZwJNA-t0tMY-rYNgnWqZB_dYA85a1/exec";

  const isValidSheetId = (id: string) => /^[a-zA-Z0-9-_]{20,}$/.test(id);
  const isValidScriptUrl = (url: string) =>
    /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9-_]+\/exec$/.test(url);

  const handleSubmit = async () => {
    const trimmedSheetId = sheetId.trim();
    const trimmedScriptUrl = customScriptUrl.trim();

    if (!isValidSheetId(trimmedSheetId)) {
      showToast("Please enter a valid Google Sheet ID", "warning");
      return;
    }

    if (useCustomScript && !isValidScriptUrl(trimmedScriptUrl)) {
      showToast("Please enter a valid Google Apps Script URL", "warning");
      return;
    }

    try {
      setLoading(true);

      await AsyncStorage.multiSet([
        ["sheetId", trimmedSheetId],
        ["scriptUrl", useCustomScript ? trimmedScriptUrl : DEFAULT_SCRIPT_URL],
      ]);

      router.replace("/(auth)/user-login");
    } catch (err) {
      console.error("Setup failed:", err);
      showToast("Something went wrong while saving workbook setup", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper scrollable>
      <View style={{ marginBottom: moderateVerticalScale(24) }}>
        <ScaledText
          size={22}
          weight="700"
          color={color.textAccent}
          style={{ textAlign: "center" }}
        >
          Setup Workbook
        </ScaledText>
      </View>

      <View style={{ gap: moderateVerticalScale(16) }}>
        <LabeledInput
          label="Google Sheet ID"
          value={sheetId}
          onChangeText={setSheetId}
          placeholder='e.g. "1BxiMVs0XRA5n..."'
        />

        <View className="flex-row items-center gap-2">
          <Checkbox
            status={useCustomScript ? "checked" : "unchecked"}
            onPress={() => setUseCustomScript((prev) => !prev)}
            color={color.primary}
          />
          <ScaledText size={14} color={color.textMuted}>
            Use custom Google Apps Script
          </ScaledText>
        </View>

        {useCustomScript && (
          <LabeledInput
            label="Custom Script URL"
            value={customScriptUrl}
            onChangeText={setCustomScriptUrl}
            placeholder="https://script.google.com/macros/s/.../exec"
          />
        )}
      </View>

      <View style={{ marginTop: moderateVerticalScale(32) }}>
        <Button
          title="Continue"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={!sheetId.trim()}
        />
      </View>
    </PageWrapper>
  );
}
