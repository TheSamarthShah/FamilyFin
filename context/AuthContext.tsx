import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { AppState } from "react-native";

type AuthContextType = {
  isLoading: boolean;
  user: any;
  family: any;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [family, setFamily] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();

  const checkAuth = useCallback(async () => {
    try {
      const storedFamily = await AsyncStorage.getItem("familyData");
      const storedUser = await AsyncStorage.getItem("userData");

      setFamily(storedFamily ? JSON.parse(storedFamily) : null);
      setUser(storedUser ? JSON.parse(storedUser) : null);

      const inAuth = segments[0] === "(auth)";

      if (!storedFamily) {
        if (!inAuth) router.replace("/(auth)/family-login");
      } else if (!storedUser) {
        if (!inAuth) router.replace("/(auth)/user-login");
      } else {
        if (inAuth) router.replace("/");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [segments]);

  useEffect(() => {
    checkAuth();
  }, [segments]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") checkAuth();
    });
    return () => subscription.remove();
  }, [checkAuth]);

  const logout = async () => {
    await AsyncStorage.multiRemove(["familyData", "userData"]);
    setUser(null);
    setFamily(null);
    router.replace("/(auth)/family-login");
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, family, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
