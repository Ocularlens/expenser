"use client";
import { SubmitButton } from "@/app/components/SubmitButton";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export default function SigninForm() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = () => {
    signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        className="border rounded-md p-2 w-full mb-2"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border rounded-md p-2 w-full mb-2"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <SubmitButton />
    </form>
  );
}
