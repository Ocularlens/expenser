"use client";
import { useRouter } from "next/navigation";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Props = {
  monthIndex: number;
};

export default function MonthSelect({ monthIndex }: Props) {
  const router = useRouter();

  const handleChange = async (e: any) => {
    router.push(`?month=${e.target.value}`);
  };

  return (
    <select
      className="border rounded-md w-full text-2xl md:w-auto"
      onChange={handleChange}
      value={monthIndex}
    >
      {MONTHS.map((month, index) => (
        <option key={index} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
}
