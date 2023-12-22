const TABLE_HEADERS = ["Description", "Amount", "Type", "Date"];

type Props = {
  transactions: Transaction[];
};

export default function TransactionsTable({ transactions }: Props) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-md text-left rtl:text-right">
        <thead className="text-black uppercase">
          <tr>
            {TABLE_HEADERS.map((header, index) => (
              <th
                scope="col"
                className="md:px-6 md:py-3"
                key={`header${index}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction, index) => {
              const isGreen =
                transaction.type === "INCOME"
                  ? "text-green-500"
                  : "text-red-500";

              return (
                <tr key={index} className={`bg-white ${isGreen}`}>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>
                    {transaction.createdDate?.toISOString().split("T")[0]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
