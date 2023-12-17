import type { Metadata } from "next";
import SignupForm from "./components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Signup Page",
};

export default async function SignupPage() {
  return (
    <div className="flex justify-center">
      <div className="border rounded-lg border-gray-200 p-4 mt-4 md:mt-0 md:w-2/4">
        <div className="mb-3 text-3xl font-bold dark:text-slate-500">
          Sign Up
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
