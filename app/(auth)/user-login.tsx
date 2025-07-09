import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useLoading } from "@/context/LoadingContext";
import { getUsers } from "@/services/sheets";
import { BUTTON_TXT } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type User = {
  code: string;
  name: string;
  email?: string;
};

export default function UserLogin() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const { isLoading, setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        router.replace("/");
        return;
      }

      try {
        setLoading(true);
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleLogin = async () => {
    const user = users.find((u) => u.code === selectedUser);
    if (!user) return;

    try {
      setLoading(true);
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      router.replace("/");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View className="flex-1 justify-center items-center px-6 bg-background dark:bg-background-dark">
      <Text className="text-lg font-heading mb-4 text-primary dark:text-primary-dark">
        Select Your Name
      </Text>

      <View className="w-full space-y-2">
        {users.map((user) => (
          <Button
            key={user.code}
            title={user.name}
            intent={selectedUser === user.code ? "primary" : "secondary"}
            onPress={() => setSelectedUser(user.code)}
          />
        ))}
      </View>

      <View className="mt-6 w-full">
        <Button
          title={BUTTON_TXT.CONTINUE}
          onPress={handleLogin}
          disabled={!selectedUser}
          intent="primary"
        />
      </View>
    </View>
  );

}
