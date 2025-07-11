import { Colors } from "@/colors";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Loading from "@/components/Loading";
import PageWrapper from "@/components/PageWrapper";
import { useLoading } from "@/context/LoadingContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { getUsers } from "@/services/sheets";
import { BUTTON_TXT, COMMON_TXT } from "@/utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

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
  const { theme } = useThemeContext();
  const router = useRouter();
  const color = Colors[theme];

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
    <PageWrapper scrollable>
      <Text style={[styles.title, { color: color.textAccent }]}>
        {COMMON_TXT.APP_TITLE}
      </Text>

      <View style={styles.dropdownWrapper}>
        <Text style={[styles.label, { color: color.textMuted }]}>
          Select Your Name
        </Text>
        <Dropdown
          options={userOptions}
          value={selectedUser}
          onChange={(item) => setSelectedUser(item.value)}
          placeholder="Choose your name"
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

const styles = StyleSheet.create({
  title: {
    fontSize: scale(22),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(24),
  },
  dropdownWrapper: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(6),
  },
});
