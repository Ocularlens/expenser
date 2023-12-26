"use client";
import FormError from "@/app/components/FormError";
import { SubmitButton } from "@/app/components/SubmitButton";
import { signIn } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { submitForm } from "../actions";

const initialState: {
  message?: string;
  errors?: { placeholder: string; message: string }[];
} = {
  message: "",
  errors: [],
};

type Props = {
  error: string;
};

export default function SigninForm({ error: signInError }: Props) {
  const [state, formAction] = useFormState(submitForm, initialState);
  let usernameError, passwordError;

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (state.errors) {
    state.errors?.forEach((error) => {
      switch (error.placeholder) {
        case "Username":
          usernameError = error.message;
          break;
        case "Password":
          passwordError = error.message;
          break;
      }
    });
  }

  useEffect(() => {
    if (state.message === "Success") {
      signIn("credentials", {
        username,
        password,
        callbackUrl: `${window.location.origin}/`,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction}>
      {signInError && <FormError message={"Invalid credentials"} />}
      <input
        type="text"
        placeholder="Username"
        name="username"
        className="border rounded-md p-2 w-full mb-2"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />
      {usernameError && <FormError message={usernameError} />}
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border rounded-md p-2 w-full mb-2"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      {passwordError && <FormError message={passwordError} />}
      <SubmitButton />
    </form>
  );
}
