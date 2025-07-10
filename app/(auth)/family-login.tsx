import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import PageWrapper from "@/components/PageWrapper";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { loginFamily } from "@/services/pocketbase";
import { BUTTON_TXT, COMMON_TXT, LOGIN_PAGE } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function FamilyLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setLoading } = useLoading();
  const { showToast } = useToast();
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
    <PageWrapper scrollable className="flex justify-center">
      <Text className="text-2xl font-heading text-primary dark:text-primary-dark mb-6 text-center">
        {COMMON_TXT.APP_TITLE}
      </Text>

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

      <Button
        title={BUTTON_TXT.CONTINUE}
        onPress={handleSubmit}
        loading={isLoading}
        className="mt-6"
      />
    </PageWrapper>
  );
}
