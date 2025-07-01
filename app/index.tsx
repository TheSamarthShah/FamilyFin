import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addTransaction, getTransactions } from '../services/sheets';
import { transformSheetData } from '../utils/transform';

export default function HomeScreen() {
  const { colors } = useTheme();
  const [balance, setBalance] = useState(0);

  const loadBalance = async () => {
    const data = await getTransactions();
    const parsed = transformSheetData(data);
    const total = parsed.reduce((acc, tx) =>
      tx.type === 'Income' ? acc + tx.amount : acc - tx.amount, 0);
    setBalance(total);
  };

  useEffect(() => {
    loadBalance();
  }, []);

  const handleAddTransaction = async () => {
    try {
      await addTransaction({
        date: new Date().toISOString().split('T')[0],
        description: 'Groceries',
        category: 'Food',
        amount: 300,
        type: 'Expense',
      });
      console.log('✅ Transaction added.');
      loadBalance(); // refresh after post
    } catch (error) {
      console.error('❌ Error posting:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16 }}>
        <Card style={{ backgroundColor: colors.surface }}>
          <Card.Title title="Family Balance" />
          <Card.Content>
            <Text variant="headlineMedium" style={{ color: colors.onSurface }}>
              ₹{balance}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={handleAddTransaction}>
              Add Transaction
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
}
