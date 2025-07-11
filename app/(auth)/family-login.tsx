import { Colors } from "@/colors";
import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import PageWrapper from "@/components/PageWrapper";
import ScaledText from "@/components/ScaledText";
import { useLoading } from "@/context/LoadingContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { loginFamily } from "@/services/pocketbase";
import { BUTTON_TXT, COMMON_TXT, LOGIN_PAGE } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";

export default function FamilyLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setLoading } = useLoading();
  const { showToast } = useToast();
  const { theme } = useThemeContext();
  const color = Colors[theme];
  const router = useRouter();

  const handleSubmit = async () => {
    if (!code.trim() || !password.trim()) {
      showToast("Please enter both Family Code and Password", "warning");
      return;
    }

    try {
      setLoading(true);
      const auth = await loginFamily(code.trim(), password.trim());

      await AsyncStorage.setItem(
        "familyData",
        JSON.stringify({
          code: auth.record.username,
          token: auth.token,
          id: auth.record.id,
        })
      );

      router.replace("/(auth)/user-login");
    } catch (err: any) {
      console.error("Login error:", err);
      showToast(err.message || "Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper scrollable>
      <View
        style={{
          marginBottom: moderateVerticalScale(24),
        }}
      >
        <ScaledText
          size={22}
          weight="700"
          color={color.textAccent}
          style={{
            textAlign: "center",
          }}
        >
          {COMMON_TXT.APP_TITLE}
        </ScaledText>
      </View>

      <View style={{ gap: moderateVerticalScale(16) }}>
        <LabeledInput
          label={LOGIN_PAGE.CODE}
          value={code}
          onChangeText={setCode}
          placeholder="Enter your code"
        />

        <LabeledInput
          label={LOGIN_PAGE.PASSWORD}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
      </View>

      <View style={{ marginTop: moderateVerticalScale(32) }}>
        <Button
          title={BUTTON_TXT.CONTINUE}
          onPress={handleSubmit}
          loading={isLoading}
        />
      </View>
    </PageWrapper>
  );
}
