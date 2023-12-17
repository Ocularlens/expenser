"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="border rounded-md dark:bg-slate-500 p-2 text-slate-50 w-full"
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </button>
  );
}
