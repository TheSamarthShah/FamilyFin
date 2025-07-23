import { Colors } from "@/colors";
import CardScroller, { Field } from "@/components/CardScroller";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import { ScrollView } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  const [transactions, setTransactions] = React.useState([
    { id: Date.now().toString(), amount: '', description: '' },
  ]);
  const [passwords, setPasswords] = React.useState([
    { id: Date.now().toString(), service: '', username: '', password: '' },
  ]);

  const transactionFields: Field[] = [
    { key: 'amount', label: 'Amount', type: 'number' },
    { key: 'description', label: 'Description', type: 'text' },
  ];

  const passwordFields: Field[] = [
    { key: 'service', label: 'Service', type: 'text' },
    { key: 'username', label: 'Username', type: 'text' },
    { key: 'password', label: 'Password', type: 'password' },
  ];

  const updateTransaction = (index: number, updated: any) => {
    const newData = [...transactions];
    newData[index] = updated;
    setTransactions(newData);
  };

  const updatePassword = (index: number, updated: any) => {
    const newData = [...passwords];
    newData[index] = updated;
    setPasswords(newData);
  };

  function handleAddAccount(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ScrollView
      style={{ paddingTop: moderateScale(5), backgroundColor: palette.bgPrimary }}
    >
      <CardScroller
        fields={transactionFields}
        label="Transaction"
      />

      <CardScroller
        fields={passwordFields}
        label="Password"
      />
    </ScrollView>
  );
}
