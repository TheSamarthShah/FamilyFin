import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';

export default function ProtectedTabsLayout() {
  const [userCode, setUserCode] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userCode').then(code => {
      setUserCode(code);
      setChecking(false);
    });
  }, []);

  if (checking) return null;
  if (!userCode) return <Redirect href="/login" />;

  return <Tabs />;
}
