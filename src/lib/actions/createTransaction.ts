import { TransactionType } from "@prisma/client";
import Transactions from "../models/transactions";

export default async function createTransaction(transaction: Transaction) {
  const newTransaction = await Transactions.create({
    data: {
      userId: transaction.userId,
      amount: transaction.amount as number,
      type: transaction.type as TransactionType,
      description: transaction.description as string,
    },
  });

  return newTransaction;
}
