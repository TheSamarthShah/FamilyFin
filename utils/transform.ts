export function transformSheetData(data: any): { amount: number, type: string }[] {
  if (!Array.isArray(data) || data.length < 2) return [];

  const [header, ...rows] = data;

  return rows.map((row) => ({
    amount: parseFloat(row[3]) || 0,
    type: row[4] || '',
  }));
}
