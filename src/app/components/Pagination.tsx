"use client";

import { useRouter } from "next/navigation";

type Props = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page: activePage, totalPages }: Props) {
  const router = useRouter();

  const navigate = (page: any) => {
    router.push(`?page=${page}`);
  };

  const pages = [];
  for (let ctr = 0; ctr < totalPages; ctr++) {
    const isActive = ctr + 1 === activePage ? "text-cyan-200" : "";

    pages.push(
      <li>
        <button
          className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${isActive}`}
          onClick={() => navigate(ctr + 1)}
        >
          {ctr + 1}
        </button>
      </li>
    );
  }

  return (
    <div className="justify-center flex mt-4">
      <ul className="list-style-none flex">
        {activePage > 1 && (
          <li className="relative block rounded bg-transparent px-3 py-1.5 text-sm">
            <button
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm"
              onClick={() => navigate(activePage - 1)}
            >
              Prev
            </button>
          </li>
        )}
        {pages.map((page) => page)}
        {activePage < totalPages && (
          <li className="relative block rounded bg-transparent px-3 py-1.5 text-sm">
            <button
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm"
              onClick={() => navigate(activePage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
