"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const ROUTES = [
  { to: "/", name: "Home" },
  { to: "/transactions", name: "Transactions" },
  { to: "/sign-up", name: "Sign up" },
  { to: "/sign-in", name: "Sign in" },
];

type Props = {
  session: any;
};

export default function Navbar({ session }: Props) {
  const [isHidden, setIsHidden] = useState<Boolean>(false);

  const routes = ROUTES.map((route) => route).filter((route) => {
    const signCond = route.to === "/sign-in" || route.to === "/sign-up";

    if (session && signCond) return false;

    return true;
  });

  return (
    <nav className="bg-white border-gray-200 dark:bg-slate-500 sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Expenser
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            setIsHidden((prev) => !prev);
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            !isHidden ? "hidden" : ""
          } transition-all w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-slate-500 md:dark:bg-slate-500">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  href={route.to}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {route.name}
                </Link>
              </li>
            ))}
            {session && (
              <button
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-left"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
