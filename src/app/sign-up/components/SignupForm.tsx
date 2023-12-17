"use client";
import FormError from "@/app/components/FormError";
import { SubmitButton } from "@/app/components/SubmitButton";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm } from "../actions";

const initialState: {
  message?: string;
  errors?: { placeholder: string; message: string }[];
} = {
  message: "",
  errors: [],
};

export default function SignupForm() {
  const [state, formAction] = useFormState(submitForm, initialState);
  let fullnameError, usernameError, passwordError;

  if (state.errors) {
    state.errors?.forEach((error) => {
      switch (error.placeholder) {
        case "Fullname":
          fullnameError = error.message;
          break;
        case "Username":
          usernameError = error.message;
          break;
        case "Password":
          passwordError = error.message;
          break;
      }
    });
  }

  if (state.message) redirect("/sign-in");

  return (
    <form action={formAction}>
      <input
        type="text"
        placeholder="Fullname"
        name="fullname"
        className="border rounded-md p-2 w-full mb-2"
      />
      {fullnameError && <FormError message={fullnameError} />}
      <input
        type="text"
        placeholder="Username"
        name="username"
        className="border rounded-md p-2 w-full mb-2"
      />
      {usernameError && <FormError message={usernameError} />}
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border rounded-md p-2 w-full mb-2"
      />
      {passwordError && <FormError message={passwordError} />}
      <SubmitButton />
    </form>
  );
}
