import { Colors } from "@/colors";
import PageWrapper from "@/components/PageWrapper";
import { useThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  const [transactions, setTransactions] = useState([
    { id: 1, amount: "", description: "" },
  ]);
  const [passwords, setPasswords] = useState([
    { id: 1, service: "", username: "", password: "" },
  ]);

  const [transactionIndex, setTransactionIndex] = useState(0);
  const [passwordIndex, setPasswordIndex] = useState(0);

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { id: transactions.length + 1, amount: "", description: "" },
    ]);
    setTransactionIndex(transactions.length); // go to the new one
  };

  const addPassword = () => {
    setPasswords([
      ...passwords,
      {
        id: passwords.length + 1,
        service: "",
        username: "",
        password: "",
      },
    ]);
    setPasswordIndex(passwords.length); // go to the new one
  };

  const updateTransaction = (id: number, field: string, value: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const updatePassword = (id: number, field: string, value: string) => {
    setPasswords((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <PageWrapper scrollable>
      <View style={{ gap: verticalScale(40) }}>
        {/* Transactions */}
        <Section
          title="Transactions"
          data={transactions}
          index={transactionIndex}
          onNext={() =>
            setTransactionIndex((i) => Math.min(i + 1, transactions.length - 1))
          }
          onPrev={() => setTransactionIndex((i) => Math.max(i - 1, 0))}
          onAdd={addTransaction}
          renderItem={(item) => (
            <View
              key={item.id}
              style={{
                borderWidth: 1,
                borderRadius: scale(8),
                padding: scale(12),
                borderColor: palette.border,
              }}
            >
              <TextInput
                placeholder="Amount"
                value={item.amount}
                onChangeText={(text) =>
                  updateTransaction(item.id, "amount", text)
                }
                keyboardType="numeric"
                placeholderTextColor={palette.muted}
                style={{
                  borderBottomWidth: 1,
                  marginBottom: scale(10),
                  paddingVertical: scale(4),
                  borderColor: palette.border,
                  color: palette.text,
                }}
              />
              <TextInput
                placeholder="Description"
                value={item.description}
                onChangeText={(text) =>
                  updateTransaction(item.id, "description", text)
                }
                placeholderTextColor={palette.muted}
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: scale(4),
                  borderColor: palette.border,
                  color: palette.text,
                }}
              />
            </View>
          )}
        />

        {/* Passwords */}
        <Section
          title="Passwords"
          data={passwords}
          index={passwordIndex}
          onNext={() =>
            setPasswordIndex((i) => Math.min(i + 1, passwords.length - 1))
          }
          onPrev={() => setPasswordIndex((i) => Math.max(i - 1, 0))}
          onAdd={addPassword}
          renderItem={(item) => (
            <View
              key={item.id}
              style={{
                borderWidth: 1,
                borderRadius: scale(8),
                padding: scale(12),
                borderColor: palette.border,
              }}
            >
              <TextInput
                placeholder="Service"
                value={item.service}
                onChangeText={(text) =>
                  updatePassword(item.id, "service", text)
                }
                placeholderTextColor={palette.muted}
                style={{
                  borderBottomWidth: 1,
                  marginBottom: scale(10),
                  paddingVertical: scale(4),
                  borderColor: palette.border,
                  color: palette.text,
                }}
              />
              <TextInput
                placeholder="Username"
                value={item.username}
                onChangeText={(text) =>
                  updatePassword(item.id, "username", text)
                }
                placeholderTextColor={palette.muted}
                style={{
                  borderBottomWidth: 1,
                  marginBottom: scale(10),
                  paddingVertical: scale(4),
                  borderColor: palette.border,
                  color: palette.text,
                }}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={item.password}
                onChangeText={(text) =>
                  updatePassword(item.id, "password", text)
                }
                placeholderTextColor={palette.muted}
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: scale(4),
                  borderColor: palette.border,
                  color: palette.text,
                }}
              />
            </View>
          )}
        />
      </View>
    </PageWrapper>
  );
}

function Section({
  title,
  data,
  index,
  onNext,
  onPrev,
  onAdd,
  renderItem,
}: {
  title: string;
  data: any[];
  index: number;
  onNext: () => void;
  onPrev: () => void;
  onAdd: () => void;
  renderItem: (item: any) => React.ReactNode;
}) {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: scale(10),
        }}
      >
        <Text style={{ fontSize: scale(20), fontWeight: "bold", color: palette.text }}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={onAdd}
          style={{
            backgroundColor: palette.primary,
            paddingHorizontal: scale(12),
            paddingVertical: scale(6),
            borderRadius: scale(8),
          }}
        >
          <Text style={{ color: palette.onPrimary }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation + Form */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
        <TouchableOpacity
          onPress={onPrev}
          style={{
            padding: scale(6),
            backgroundColor: palette.muted,
            borderRadius: scale(6),
            opacity: index === 0 ? 0.5 : 1,
          }}
          disabled={index === 0}
        >
          <Text style={{ fontSize: scale(18), color: palette.text }}>{"<"}</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>{renderItem(data[index])}</View>

        <TouchableOpacity
          onPress={onNext}
          style={{
            padding: scale(6),
            backgroundColor: palette.muted,
            borderRadius: scale(6),
            opacity: index === data.length - 1 ? 0.5 : 1,
          }}
          disabled={index === data.length - 1}
        >
          <Text style={{ fontSize: scale(18), color: palette.text }}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
