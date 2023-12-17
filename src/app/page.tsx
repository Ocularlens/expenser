import getUserTransactions from "@/lib/actions/getUserTransactions";
import MonthSelect from "./components/MonthSelect";

type Props = {
  searchParams: {
    month: string;
  };
};

export default async function Home({ searchParams: { month } }: Props) {
  const transactions: Transaction[] = await getUserTransactions(
    0,
    Number(month)
  );

  return (
    <div className="md:grid md:grid-cols-2 gap-4">
      <div className="border rounded-lg border-gray-200 p-4 md:mt-4 md:col-span-2">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">Month</div>
        <div className="text-lg">
          <MonthSelect />
        </div>
      </div>
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Total Income
        </div>
        <div className="text-lg">Amount:</div>
      </div>
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Total Expense
        </div>
        <div className="text-lg">Amount:</div>
      </div>
    </div>
  );
}
