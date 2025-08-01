import Loading from "@/components/Loading";
import { AuthProvider, useAuthContext } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { Slot } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "../themes";
import "./global.css";

function ThemedLayout() {
  const { theme, isThemeLoaded } = useThemeContext();
  const { isLoading: authLoading } = useAuthContext();
  const paperTheme = theme === "dark" ? darkTheme : lightTheme;

  if (!isThemeLoaded || authLoading) {
    return <Loading />;
  }

  return (
    <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1 }}
            className="bg-bgPrimary dark:bg-bgPrimary-dark"
          >
            <PaperProvider theme={paperTheme}>
              <Slot />
            </PaperProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <ThemedLayout />
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
