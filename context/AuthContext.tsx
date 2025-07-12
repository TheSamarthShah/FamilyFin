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

type WorkbookData = {
  sheetId: string;
  scriptUrl: string;
};

type AuthContextType = {
  isLoading: boolean;
  user: any;
  workbookData: WorkbookData | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [workbookData, setWorkbookData] = useState<WorkbookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();

  const checkAuth = useCallback(async () => {
    try {
      const storedSheetId = await AsyncStorage.getItem("sheetId");
      const storedScriptUrl = await AsyncStorage.getItem("scriptUrl");
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedSheetId && storedScriptUrl) {
        setWorkbookData({
          sheetId: storedSheetId,
          scriptUrl: storedScriptUrl,
        });
      } else {
        setWorkbookData(null);
      }

      setUser(storedUser ? JSON.parse(storedUser) : null);

      const path = segments.join("/");
      const inAuth = segments[0] === "(auth)";
      const inWorkbookSetup = path === "(auth)/workbook-setup";
      const inUserLogin = path === "(auth)/user-login";

      if (!storedSheetId || !storedScriptUrl) {
        if (!inWorkbookSetup) router.replace("/(auth)/workbook-setup");
      } else if (!storedUser) {
        if (!inUserLogin) router.replace("/(auth)/user-login");
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
    await AsyncStorage.multiRemove(["sheetId", "scriptUrl", "userData"]);
    setUser(null);
    setWorkbookData(null);
    router.replace("/(auth)/workbook-setup");
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, user, workbookData, checkAuth, logout }}
    >
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
