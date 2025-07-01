import axios from 'axios';

const BASE_URL = 'https://script.google.com/macros/s/AKfycbzDU1bHCmvRHG5gFOY-kx1xxkTJ9VxChUR_sLWAmD6_ss-KDQCeTHGZYbpmxy1jP_mx/exec';

export const addTransaction = async (entry: {
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'Income' | 'Expense';
}) => {
  const response = await axios.post(BASE_URL, entry);
  return response.data;
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const text = response.data;

    if (!Array.isArray(text)) {
      console.warn('⚠️ Unexpected response format:', text);
      return [];
    }

    return text;
  } catch (error) {
    console.error('❌ Failed to fetch transactions:', error);
    return [];
  }
};
