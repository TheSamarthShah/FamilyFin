import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function FamilyLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const isValid = code.length > 1 && password === "1234";
    if (!isValid) return alert("Invalid");

    await AsyncStorage.setItem("familyData", JSON.stringify({ code }));
    router.replace("/(auth)/user-login");
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

      <Button title="Continue" onPress={handleSubmit} />
    </View>
  );
}
