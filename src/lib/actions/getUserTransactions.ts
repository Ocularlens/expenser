import Transactions from "../models/transactions";

export default async function getUserTransactions(userId?: number, month?: number) {
  const transactions: Transaction[] = await Transactions.findMany({
    where: {
      userId: userId,
    },
  });

  return transactions;
}
