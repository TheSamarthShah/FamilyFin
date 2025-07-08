import { getUsers } from "@/services/sheets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function UserLogin() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async () => {
    const user = users.find((u) => u.code === selectedUser);
    if (!user) return;
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    router.replace("/");
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-black">
      <Text className="text-lg mb-4">Select User</Text>
      {users.map((user) => (
        <Button
          key={user.code}
          title={user.name}
          onPress={() => setSelectedUser(user.code)}
        />
      ))}
      <Button title="Login" disabled={!selectedUser} onPress={handleLogin}/>
    </View>
  );
}
