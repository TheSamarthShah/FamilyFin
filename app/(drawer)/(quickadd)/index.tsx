import { Colors } from "@/colors";
import CardScroller, { Field } from "@/components/CardScroller";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  // Transaction Data
  const [transactions, setTransactions] = React.useState([
    { id: Date.now().toString(), amount: 0, description: '', paymentMethod: null, date: null }
  ]);

  // Password Data
  const [passwords, setPasswords] = React.useState([
    { id: Date.now().toString(), service: '', username: '', password: '' }
  ]);

  // Demo Data for all input types
  const [demoData, setDemoData] = React.useState([
    { 
      id: Date.now().toString(),
      textField: '',
      numberField: 0,
      dateField: null,
      selectField: null,
      radioField: null
    }
  ]);

  // Currency Input State
  const [amount, setAmount] = React.useState("");
  const [selectedCurrency, setSelectedCurrency] = React.useState({
    label: "USD",
    value: "usd",
  });

  // Options for select and radio fields
  const paymentMethods = [
    { label: 'Credit Card', value: 'credit' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Bank Transfer', value: 'bank' }
  ];

  const frequencyOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' }
  ];

  // Field Definitions
  const transactionFields: Field[] = [
    { 
      key: 'amount', 
      label: 'Amount', 
      type: 'input-select', 
      defaultValue: 0,
      required: true,
      options: [
          { label: "USD", value: "usd" },
          { label: "INR", value: "inr" },
          { label: "EUR", value: "eur" },
        ],
        defaultSelectedForInputSelect: 'inr',
        textInputType: 'decimal'
    },
    { 
      key: 'description', 
      label: 'Description', 
      type: 'text',
      textInputType:'text',
      multilineTextInput: true,
      defaultValue: '' 
    },
    { 
      key: 'paymentMethod', 
      label: 'Payment Method', 
      type: 'select',
      defaultValue: null,
      options: paymentMethods,
      required: true
    },
    { 
      key: 'date', 
      label: 'Date', 
      type: 'date', 
      defaultValue: null,
      required: true 
    }
  ];

  const passwordFields: Field[] = [
    { 
      key: 'service', 
      label: 'Service', 
      type: 'text', 
      defaultValue: '',
      required: true 
    },
    { 
      key: 'username', 
      label: 'Username', 
      type: 'text', 
      defaultValue: '',
      required: true 
    },
    { 
      key: 'password', 
      label: 'Password', 
      type: 'text', 
      defaultValue: '',
      required: true 
    }
  ];

  // Handlers for Transactions
  const handleTransactionsChange = (updatedCards: any[]) => {
    const cardsWithIds = updatedCards.map(card => ({
      ...card,
      id: card.id || Date.now().toString()
    }));
    setTransactions(cardsWithIds);
  };

  const handleSaveTransactions = (cards: any[]) => {
    const validTransactions = cards.filter(
      card => card.amount && card.description && card.paymentMethod && card.date
    );
    console.log('Saving transactions:', validTransactions);
    setTransactions(validTransactions.length ? validTransactions : [{
      id: Date.now().toString(), 
      amount: 0, 
      description: '', 
      paymentMethod: null,
      date: null
    }]);
  };

  // Handlers for Passwords
  const handlePasswordsChange = (updatedCards: any[]) => {
    const cardsWithIds = updatedCards.map(card => ({
      ...card,
      id: card.id || Date.now().toString()
    }));
    setPasswords(cardsWithIds);
  };

  const handleSavePasswords = (cards: any[]) => {
    const validPasswords = cards.filter(
      card => card.service && card.username && card.password
    );
    console.log('Saving passwords:', validPasswords);
    setPasswords(validPasswords.length ? validPasswords : [{
      id: Date.now().toString(), 
      service: '', 
      username: '', 
      password: ''
    }]);
  };

  // Handlers for Demo Data
  const handleDemoChange = (updatedCards: any[]) => {
    const cardsWithIds = updatedCards.map(card => ({
      ...card,
      id: card.id || Date.now().toString()
    }));
    setDemoData(cardsWithIds);
  };

  const handleSaveDemo = (cards: any[]) => {
    console.log('Saving demo data:', cards);
    const validCards = cards.filter(card => 
      card.textField || 
      card.numberField || 
      card.dateField || 
      card.selectField || 
      card.radioField
    );
    setDemoData(validCards.length ? validCards : [{
      id: Date.now().toString(),
      textField: '',
      numberField: 0,
      dateField: null,
      selectField: null,
      radioField: null
    }]);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.bgPrimary }]}
      contentContainerStyle={styles.contentContainer}
    >
      <CardScroller
        fields={transactionFields}
        label="Payment Records"
        initialCards={transactions}
        onChange={handleTransactionsChange}
        onSave={handleSaveTransactions}
        maxCards={10}
        collapsible={true}
      />
      <CardScroller
        fields={passwordFields}
        label="Saved Credentials"
        initialCards={passwords}
        onChange={handlePasswordsChange}
        onSave={handleSavePasswords}
        maxCards={10}
        collapsible={true}
        initiallyCollapsed={true}
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
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginTop: moderateVerticalScale(24),
    marginBottom: moderateVerticalScale(12),
  },
});