import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DEFAULT_SHEET_NAME = "Users";

const getSheetConfig = async (): Promise<{
  scriptUrl: string | null;
  sheetId: string | null;
}> => {
  try {
    const [scriptUrl, sheetId] = await Promise.all([
      AsyncStorage.getItem("scriptUrl"),
      AsyncStorage.getItem("sheetId"),
    ]);
    return {
      scriptUrl: scriptUrl?.trim() || null,
      sheetId: sheetId?.trim() || null,
    };
  } catch (err) {
    console.error("Failed to get sheet config from storage:", err);
    return { scriptUrl: null, sheetId: null };
  }
};

// Add a new transaction
export const addTransaction = async (entry: {
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "Income" | "Expense";
}) => {
  const { scriptUrl, sheetId } = await getSheetConfig();
  if (!scriptUrl || !sheetId) throw new Error("Missing script URL or sheet ID");

  const payload = {
    ...entry,
    sheet: "Transactions",
    sheetId,
  };

  const response = await axios.post(scriptUrl, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

// Get all transactions
export const getTransactions = async () => {
  const { scriptUrl, sheetId } = await getSheetConfig();
  if (!scriptUrl || !sheetId) return [];

  try {
    const response = await axios.get(scriptUrl, {
      params: { sheet: "Transactions", sheetId },
    });

    const raw = response.data;
    const rows = raw?.data;

    if (!Array.isArray(rows) || rows.length < 2) return [];

    const [, ...dataRows] = rows;

    return dataRows
      .filter((r) => r.length >= 4)
      .map(([date, description, category, amount, type]) => ({
        date,
        description,
        category,
        amount: parseFloat(amount),
        type,
      }));
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};

// Get all users
export const getUsers = async (): Promise<
  { code: string; name: string; email: string }[]
> => {
  const { scriptUrl, sheetId } = await getSheetConfig();
  if (!scriptUrl || !sheetId) return [];

  try {
    const response = await axios.get(scriptUrl, {
      params: { sheet: DEFAULT_SHEET_NAME, sheetId },
    });

    const rows = response.data?.data;
    if (!Array.isArray(rows) || rows.length < 2) return [];

    const [, ...dataRows] = rows;

    return dataRows
      .filter((row) => row.length >= 3)
      .map((row) => ({
        code: row[0]?.toString().trim(),
        name: row[1]?.toString().trim(),
        email: row[2]?.toString().trim(),
      }))
      .filter((u) => u.code && u.name);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
};
