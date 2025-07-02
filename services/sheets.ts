import axios from 'axios';

const BASE_URL = 'https://script.google.com/macros/s/AKfycbyKTnmRcEARDo7tZKuuv-L49WooGsUiq55xCENZwJNA-t0tMY-rYNgnWqZB_dYA85a1/exec';

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
      console.warn(' Unexpected response format:', text);
      return [];
    }

    return text;
  } catch (error) {
    console.error(' Failed to fetch transactions:', error);
    return [];
  }
};
interface SheetResponse {
  data?: any[][];
  error?: string;
}
export const getUsers = async (): Promise<any[]> => {
  try {
    const response = await axios.get<any>(`${BASE_URL}`,{
  withCredentials: false
});
    console.log(response.data.data);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    if (!response.data.data) {
      return [];
    }
    
    // Skip headers
    const [, ...dataRows] = response.data.data;
    
    return dataRows.map((row: any[]) => ({
      code: row[0]?.toString() || '',
      name: row[1]?.toString() || '',
      email: row[2]?.toString() || '',
    }));
    
  } catch (err) {
    console.error('Failed to fetch users:', err);
    throw err; 
  }
};