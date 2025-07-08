import { getUsers } from "@/services/sheets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type User = {
  code: string;
  name: string;
  email: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async () => {
    if (!selectedUser) return;

    const user = users.find((u) => u.code === selectedUser);
    if (!user) return;

    await AsyncStorage.setItem("userData", JSON.stringify(user));
    router.replace("/");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator />
        <Text className="mt-2 text-gray-700">Loading ...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView  className="bg-background dark:bg-background-dark p-4 rounded-card">
        
      </SafeAreaView>

      {/* <View className="flex-1 justify-center items-center px-6 bg-white">
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setVisible(true)}
              className="mb-4"
              labelStyle={{ fontSize: 16 }}
            >
              {selectedUser
                ? users.find((u) => u.code === selectedUser)?.name
                : "Select User"}
            </Button>
          }
        >
          {users.map((user) => (
            <React.Fragment key={user.code}>
              <Menu.Item
                onPress={() => {
                  setSelectedUser(user.code);
                  setVisible(false);
                }}
                title={user.name}
              />
              <Divider />
            </React.Fragment>
          ))}
        </Menu>

        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={!selectedUser}
          className="mt-4 w-full"
          labelStyle={{ fontSize: 16 }}
        >
          Login
        </Button>
      </View> */}
    </SafeAreaProvider>
  );
}
