import Button from "@/components/Button";
import Loading from "@/components/Loading";
import PageWrapper from "@/components/PageWrapper";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { getUsers } from "@/services/sheets";
import { BUTTON_TXT, COMMON_TXT } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type User = {
  code: string;
  name: string;
  email?: string;
};

export default function UserLogin() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const { isLoading, setLoading } = useLoading();
  const { showToast } = useToast();
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
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        showToast("Unable to load users", "error");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleLogin = async () => {
    const user = users.find((u) => u.code === selectedUser);
    if (!user) {
      showToast("Please select your name", "warning");
      return;
    }

    try {
      setLoading(true);
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      router.replace("/");
    } catch (err) {
      console.error("Login failed:", err);
      showToast("Something went wrong during login", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  const userOptions = users.map((user) => ({
    label: user.name,
    value: user.code,
  }));

  return (
    <PageWrapper scrollable className="flex justify-center">
      <Text className="text-2xl font-heading text-primary dark:text-primary-dark mb-6 text-center">
        {COMMON_TXT.APP_TITLE}
      </Text>

      <View className="mb-4">
        <Text className="text-muted dark:text-muted mb-1">Select Your Name</Text>
        <Dropdown
          data={userOptions}
          labelField="label"
          valueField="value"
          value={selectedUser}
          placeholder="Choose your name"
          onChange={(item) => setSelectedUser(item.value)}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            backgroundColor: "white",
          }}
          placeholderStyle={{ color: "#9CA3AF" }}
          selectedTextStyle={{ color: "#000" }}
          containerStyle={{ borderRadius: 8 }}
        />
      </View>

      <Button
        title={BUTTON_TXT.CONTINUE}
        onPress={handleLogin}
        disabled={!selectedUser}
        className="mt-6"
      />
    </PageWrapper>
  );
}
