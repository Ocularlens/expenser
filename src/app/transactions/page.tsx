import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import TransactionForm from "./components/TransactionForm";
import TransactionsTable from "./components/TransactionsTable";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Transactions Page",
};

export default async function TransactionsPage() {
  const transactions: Transaction[] = [
    {
      id: 1,
      userId: 2,
      amount: 200,
      description: "Test Data",
      type: "INCOME",
      createdDate: new Date(),
      updatedDate: new Date(),
    },
    {
      id: 2,
      userId: 2,
      amount: 200,
      description: "Test Data",
      type: "EXPENSE",
      createdDate: new Date(),
      updatedDate: new Date(),
    },
  ];

  const session = await getServerSession(options);

  return (
    <div className="md:grid md:grid-cols-2 gap-4">
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0 min-h-">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Add Transaction
        </div>
        <div>
          <TransactionForm userId={session?.user?.id} />
        </div>
      </div>
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Recent Transactions
        </div>
        <div>
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
