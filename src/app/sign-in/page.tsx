import type { Metadata } from "next";
import SigninForm from "./components/SinginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Signin Page",
};

type Props = {
  searchParams: {
    error: string;
  };
};

export default function SigninPage({ searchParams: { error } }: Props) {
  return (
    <div className="flex justify-center">
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0 md:w-2/4">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Sign In
        </div>
        <SigninForm error={error} />
      </div>
    </div>
  );
}
