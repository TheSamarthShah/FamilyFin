import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function Loading() {
  const { theme } = useThemeContext();
  const c = Colors[theme];

  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: c.bgPrimary,
    padding: moderateScale(16),
  };

  return (
    <View style={containerStyle}>
      <ActivityIndicator size="large" color={c.warning} />
    </View>
  );
}
