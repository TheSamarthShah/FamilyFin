import { Slot } from "expo-router";
import { useColorScheme, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "../themes";
import "./global.css";

export default function Layout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <View className={scheme === "dark" ? "dark flex-1" : "flex-1"}>
        <PaperProvider theme={theme}>
          <Slot />
        </PaperProvider>
      </View>
    </SafeAreaProvider>
  );
}
