import { getUserTransactionPerMonth } from "@/lib/actions/getUserTransactions";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import MonthSelect from "./components/MonthSelect";

type Props = {
  searchParams: {
    month: string;
  };
};

export default async function Home({ searchParams: { month } }: Props) {
  const session = await getServerSession(options);
  const userId = session?.user?.id as number;

  const monthNum = month ? +month : new Date().getMonth() + 1;

  const [totalIncome, totalExpense] = await getUserTransactionPerMonth(
    userId,
    monthNum
  );

  return (
    <div className="md:grid md:grid-cols-2 gap-4">
      <div className="border rounded-lg border-gray-200 p-4 md:mt-4 md:col-span-2">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">Month</div>
        <div className="text-lg">
          <MonthSelect monthIndex={monthNum} />
        </div>
      </div>
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Total Income
        </div>
        <div className="text-lg">
          Amount:{" "}
          {totalIncome.toLocaleString("en-Us", { maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Total Expense
        </div>
        <div className="text-lg">
          Amount:{" "}
          {totalExpense.toLocaleString("en-Us", { maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}
