import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Transactions Page",
};

export default async function TransactionsPage() {
  const transactions: Transaction[] = [];

  return (
    <main className="p-4">
      Transactions Page
    </main>
  );
}
