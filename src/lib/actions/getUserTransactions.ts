import Transactions from "../models/transactions";
import dateGenerator from "../utils/dateGenerator";

export default async function getUserTransactions(
  userId: number,
  page: number
) {
  const transactions: Transaction[] = await Transactions.findMany({
    where: {
      userId: userId,
    },
    take: 10,
    skip: (page - 1) * 10,
    orderBy: {
      createdDate: "desc",
    },
  });

  return transactions;
}

export async function countUserTransactions(userId: number) {
  const count: number = await Transactions.count({
    where: {
      userId,
    },
  });

  return count;
}

export async function getUserTransactionPerMonth(
  userId: number,
  month: number
) {
  const [start, end] = dateGenerator(month);
  const transactions: { amount: number; type: string }[] =
    await Transactions.findMany({
      select: {
        amount: true,
        type: true,
      },
      where: {
        createdDate: {
          gte: new Date(start),
          lte: new Date(end),
        },
        userId,
      },
    });

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "INCOME")
      return (totalIncome += transaction.amount);
    return (totalExpense += transaction.amount);
  });

  return [totalIncome, totalExpense];
}
