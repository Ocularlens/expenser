import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { options } from "./api/auth/[...nextauth]/options";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker App",
  description: "Expense Tracker App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar session={session} />
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
