import { Colors } from "@/colors";
import CardScroller, { Field } from "@/components/CardScroller";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

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
    { key: 'amount', label: 'Amount', type: 'number', required: true },
    { key: 'description', label: 'Description', type: 'text' },
  ];

  const passwordFields: Field[] = [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'username', label: 'Username', type: 'text', required: true },
    { key: 'password', label: 'Password', type: 'password', required: true },
  ];

  const handleTransactionsChange = (updatedCards: any[]) => {
    // Ensure each card has an id
    const cardsWithIds = updatedCards.map(card => ({
      ...card,
      id: card.id || Date.now().toString()
    }));
    setTransactions(cardsWithIds);
  };

  const handlePasswordsChange = (updatedCards: any[]) => {
    // Ensure each card has an id
    const cardsWithIds = updatedCards.map(card => ({
      ...card,
      id: card.id || Date.now().toString()
    }));
    setPasswords(cardsWithIds);
  };

  const handleSaveTransactions = (cards: any[]) => {
    // Filter out empty transactions if needed
    const validTransactions = cards.filter(
      card => card.amount && card.description
    );
    
    console.log('Saving transactions:', validTransactions);
    // Here you would typically make an API call
    setTransactions(validTransactions.length ? validTransactions : [{ id: Date.now().toString(), amount: '', description: '' }]);
  };

  const handleSavePasswords = (cards: any[]) => {
    // Filter out incomplete password entries
    const validPasswords = cards.filter(
      card => card.service && card.username && card.password
    );
    
    console.log('Saving passwords:', validPasswords);
    // Here you would typically make an API call or save to secure storage
    setPasswords(validPasswords.length ? validPasswords : [{ id: Date.now().toString(), service: '', username: '', password: '' }]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.bgPrimary }]}
      contentContainerStyle={styles.contentContainer}
    >
      
      <CardScroller
        fields={transactionFields}
        label="Transactions"
        initialCards={transactions}
        onChange={handleTransactionsChange}
        onSave={handleSaveTransactions}
        maxCards={10}
        collapsible={true}
      />

      <CardScroller
        fields={passwordFields}
        label="Saved Passwords"
        initialCards={passwords}
        onChange={handlePasswordsChange}
        onSave={handleSavePasswords}
        maxCards={10}
        collapsible={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateVerticalScale(16),
  },
  contentContainer: {
    paddingBottom: moderateVerticalScale(32),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    marginHorizontal: moderateScale(16),
    marginBottom: moderateVerticalScale(8),
    marginTop: moderateVerticalScale(16),
  },
});