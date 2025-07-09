import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useLoading } from "@/context/LoadingContext";
import { loginFamily } from "@/services/pocketbase";
import { BUTTON_TXT, COMMON_TXT, LOGIN_PAGE } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function FamilyLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setLoading } = useLoading(); // using global loading context
  const router = useRouter();

  const handleSubmit = async () => {
    if (!code.trim() || !password.trim()) {
      alert("Please enter both Family Code and Password");
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
      alert(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View className="flex-1 justify-center px-6 bg-background dark:bg-background-dark">
      <Text className="text-2xl font-heading text-primary dark:text-primary-dark mb-6">
        {COMMON_TXT.APP_TITLE}
      </Text>

      <View className="mb-4">
        <Text className="text-muted dark:text-muted mb-1">{LOGIN_PAGE.CODE}</Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Enter your code"
          placeholderTextColor="#9CA3AF"
          className="bg-surface text-black dark:text-white px-4 py-2 rounded-md border border-neutral"
        />
      </View>

      <View className="mb-6">
        <Text className="text-muted dark:text-muted mb-1">{LOGIN_PAGE.PASSWORD}</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
          className="bg-surface text-black dark:text-white px-4 py-2 rounded-md border border-neutral"
        />
      </View>

      <Button
        title={BUTTON_TXT.CONTINUE}
        onPress={handleSubmit}
        loading={isLoading}
      />
    </View>
  );
}
