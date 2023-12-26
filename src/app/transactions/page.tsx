import getUserTransactions, {
  countUserTransactions,
} from "@/lib/actions/getUserTransactions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Pagination from "../components/Pagination";
import TransactionForm from "./components/TransactionForm";
import TransactionsTable from "./components/TransactionsTable";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Transactions Page",
};

type Props = {
  searchParams: {
    page: string;
  };
};

export default async function TransactionsPage({
  searchParams: { page },
}: Props) {
  const activePage = page ? Number(page) : 1;
  const session = await getServerSession(options);
  const userId = session?.user?.id as number;

  const count = await countUserTransactions(userId);
  const transactions: Transaction[] = await getUserTransactions(
    userId,
    Number(activePage)
  );

  return (
    <div className="md:grid md:grid-cols-2 gap-4">
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0 min-h-">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Add Transaction
        </div>
        <div>
          <TransactionForm userId={userId} />
        </div>
      </div>
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Recent Transactions
        </div>
        <div>
          <TransactionsTable transactions={transactions} />
          <Pagination page={activePage} totalPages={Math.ceil(count / 10)} />
        </div>
      </div>
    </div>
  );
}
