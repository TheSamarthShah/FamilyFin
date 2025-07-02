import { getUsers } from '@/services/sheets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, Divider, Menu, Provider, Text } from 'react-native-paper';

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

    // Find the full user object
    const user = users.find((u) => u.code === selectedUser);
    if (!user) return;

    // Store the entire user object in AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    router.replace('/'); // Navigate to home
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading users…</Text>
      </View>
    );
  }

  return (
    <Provider>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Button 
              mode="outlined" 
              onPress={() => setVisible(true)}
              style={{ marginBottom: 16 }}
            >
              {selectedUser 
                ? users.find(u => u.code === selectedUser)?.name 
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
          style={{ marginTop: 16 }}
        >
          Login
        </Button>
      </View>
    </Provider>
  );
}