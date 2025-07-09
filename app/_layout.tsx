import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "../themes";
import "./global.css";

function ThemedLayout() {
  const { theme, isThemeLoaded } = useThemeContext();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const paperTheme = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    const checkAuth = async () => {
      const inAuth = segments[0] === "(auth)";
      try {
        const family = await AsyncStorage.getItem("familyData");
        if (!family) {
          if (!inAuth) router.replace("/(auth)/family-login");
          setCheckingAuth(false);
          return;
        }

        const user = await AsyncStorage.getItem("userData");
        if (!user) {
          if (!inAuth) router.replace("/(auth)/user-login");
          setCheckingAuth(false);
          return;
        }

        if (inAuth) router.replace("/");
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [segments]);

  if (!isThemeLoaded || checkingAuth) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1 }}
            className={theme === "dark" ? "bg-gray-900" : "bg-white"}
          >
            <PaperProvider theme={paperTheme}>
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
              </View>
            </PaperProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          className="dark:bg-background-dark bg-background"
        >
          <PaperProvider theme={paperTheme}>
            <View className="flex-1">
              <Slot />
            </View>
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}
