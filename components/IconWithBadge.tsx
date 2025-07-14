import { Colors } from "@/colors";
import { useThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface IconWithBadgeProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  badgeCount?: number;
  containerStyle?: ViewStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
  badgeColor?: string;
  pulseEffect?: boolean;
}

const IconWithBadge: React.FC<IconWithBadgeProps> = ({
  name,
  size = 28,
  color,
  badgeCount = 0,
  containerStyle,
  badgeStyle,
  badgeTextStyle,
  badgeColor,
  pulseEffect = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const { theme } = useThemeContext();
  const palette = Colors[theme];

  const finalColor = color ?? palette.positive;
  const finalBadgeColor = badgeColor ?? palette.expense;

  useEffect(() => {
    if (badgeCount > 0) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          useNativeDriver: true,
          speed: 30,
          bounciness: 15,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 8,
        }),
      ]).start();

      if (pulseEffect) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    } else {
      scaleAnim.setValue(0);
      pulseAnim.setValue(1);
    }
  }, [badgeCount]);

  return (
    <View style={[styles.iconContainer, containerStyle]}>
      <Ionicons name={name} size={size} color={finalColor} />
      {badgeCount > 0 && (
        <Animated.View
          style={[
            styles.badge,
            {
              backgroundColor: finalBadgeColor,
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim }
              ],
            },
            badgeStyle,
          ]}
        >
          <Text style={[styles.badgeText, badgeTextStyle]}>
            {badgeCount > 99 ? "99+" : badgeCount}
          </Text>
          <View style={styles.badgeShine} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  iconContainer: {
    width: "36@s",
    height: "36@vs",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "-6@vs",
    right: "-8@s",
    minWidth: "20@ms",
    height: "20@ms",
    paddingHorizontal: "5@s",
    borderRadius: "15@ms",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 2,
    overflow: "hidden",
  },
  badgeShine: {
    position: "absolute",
    top: -5,
    left: -5,
    width: "60%",
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: [{ rotate: "30deg" }],
    borderRadius: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: "11@ms",
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    zIndex: 1,
  },
});

export default IconWithBadge;
