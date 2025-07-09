
import { loginFamily } from "@/services/pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function FamilyLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!code || !password) {
      alert("Please enter both code and password");
      return;
    }

    try {
      setLoading(true);
      const auth = await loginFamily(code, password);

      // Save only what you need — token, family code, etc.
      await AsyncStorage.setItem("familyData", JSON.stringify({
        code: auth.record.username,
        token: auth.token,
        id: auth.record.id,
      }));

      router.replace("/(auth)/user-login");
    } catch (err: any) {
      console.error("Login error", err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background dark:bg-background-dark">
      <Text className="text-xl font-bold mb-4 text-primary dark:text-primary-dark">
        Family Code
      </Text>

      <TextInput
        placeholder="Family Code"
        value={code}
        onChangeText={setCode}
        className="border border-muted p-2 mb-2 text-black dark:text-white"
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-muted p-2 mb-4 text-black dark:text-white"
        placeholderTextColor="#9CA3AF"
      />

      <Button title={loading ? "Logging in..." : "Continue"} onPress={handleSubmit} disabled={loading} />
    </View>
  );
}
