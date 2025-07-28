import { Colors } from "@/colors";
import CardScroller, { Field } from "@/components/CardScroller";
import InputSelect from "@/components/InputSelect";
import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const palette = Colors[theme];

  // Transaction Data
  const [transactions, setTransactions] = React.useState([
    { id: Date.now().toString(), amount: '', description: '', date: null }
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
    { key: 'amount', label: 'Amount', type: 'number', required: true },
    { key: 'description', label: 'Description', type: 'text' },
    { 
      key: 'paymentMethod', 
      label: 'Payment Method', 
      type: 'select',
      options: paymentMethods,
      required: true
    },
    { key: 'date', label: 'Date', type: 'date', required: true }
  ];

  const passwordFields: Field[] = [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'username', label: 'Username', type: 'text', required: true },
    { key: 'password', label: 'Password', type: 'text', required: true }
  ];

  const demoFields: Field[] = [
    { key: 'textField', label: 'Text Input', type: 'text', required: true },
    { key: 'numberField', label: 'Number Input', type: 'number' },
    { key: 'dateField', label: 'Date Picker', type: 'date' },
    { 
      key: 'selectField', 
      label: 'Dropdown Select', 
      type: 'select',
      options: paymentMethods
    },
    { 
      key: 'radioField', 
      label: 'Frequency', 
      type: 'radio',
      options: frequencyOptions
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
      amount: '', 
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
  const [amount, setAmount] = React.useState("");
const [selectedCurrency, setSelectedCurrency] = React.useState({
  label: "USD",
  value: "usd",
});


  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.bgPrimary }]}
      contentContainerStyle={styles.contentContainer}
    >
      <InputSelect
  value={amount}
  onChange={setAmount}
  selectedOption={selectedCurrency}
  onSelect={setSelectedCurrency}
  options={[
    { label: "USD", value: "usd" },
    { label: "INR", value: "inr" },
    { label: "EUR", value: "eur" },
  ]}
/>


      <Text style={[styles.sectionTitle, { color: palette.textPrimary }]}>
        All Input Types Demo
      </Text>
      <CardScroller
        fields={demoFields}
        label="Input Types Showcase"
        initialCards={demoData}
        onChange={handleDemoChange}
        onSave={handleSaveDemo}
        maxCards={5}
        collapsible={true}
      />

      <Text style={[styles.sectionTitle, { color: palette.textPrimary }]}>
        Transactions
      </Text>
      <CardScroller
        fields={transactionFields}
        label="Payment Records"
        initialCards={transactions}
        onChange={handleTransactionsChange}
        onSave={handleSaveTransactions}
        maxCards={10}
        collapsible={true}
      />

      <Text style={[styles.sectionTitle, { color: palette.textPrimary }]}>
        Password Manager
      </Text>
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
    paddingHorizontal: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginTop: moderateVerticalScale(24),
    marginBottom: moderateVerticalScale(12),
  },
});