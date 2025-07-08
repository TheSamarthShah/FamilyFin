import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "../themes";
import "./global.css";

function ThemedLayout() {
  const { theme, toggleTheme } = useThemeContext();
  const paperTheme = theme === "dark" ? darkTheme : lightTheme;
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const inAuth = segments[0] === "(auth)";
      const family = await AsyncStorage.getItem("familyData");
      if (!family) {
        if (!inAuth) router.replace("/(auth)/family-login");
        setChecking(false);
        return;
      }
      const user = await AsyncStorage.getItem("userData");
      if (!user) {
        if (!inAuth) router.replace("/(auth)/user-login");
        setChecking(false);
        return;
      }

      if (inAuth) router.replace("/");
      setChecking(false);
    };
    checkAuth();
  }, [segments]);

  if (checking) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
            <ActivityIndicator />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView className={`${theme === "dark" ? "dark" : ""} flex-1`}>
          <PaperProvider theme={paperTheme}>
            <View className="absolute top-4 right-4 z-10">
              <ToggleButton toggleTheme={toggleTheme} currentTheme={theme} />
            </View>
            <View className="p-4 flex-1">
              <Slot />
            </View>
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function ToggleButton({ toggleTheme, currentTheme }: any) {
  return (
    <Pressable onPress={toggleTheme} className="px-3 py-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm shadow-md">
      <Text className="text-lg font-semibold text-black dark:text-white">
        {currentTheme === "dark" ? "☀️" : "🌙"}
      </Text>
    </Pressable>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}
