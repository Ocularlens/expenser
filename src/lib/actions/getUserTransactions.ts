import Transactions from "../models/transactions";

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

export async function countUserTransactions(userId?: number) {
  const count: number = await Transactions.count({
    where: {
      userId,
    },
  });

  return count;
}
