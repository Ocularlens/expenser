"use client";
import FormError from "@/app/components/FormError";
import { SubmitButton } from "@/app/components/SubmitButton";
import { TransactionTypes } from "@/lib/enum";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { newTransaction } from "../actions";

type FormActionState = {
  message?: string;
  errors?: { placeholder: string; message: string }[];
};

type FormState = {
  amount: null | number;
  description: string;
  type: string;
};

const formInitialState: FormState = {
  amount: null,
  description: "",
  type: TransactionTypes.INCOME,
};

const actionInitialState: FormActionState = {
  message: "",
  errors: [],
};

type Props = {
  userId: number;
};

export default function TransactionForm({ userId }: Props) {
  const [actionState, formAction] = useFormState(
    newTransaction,
    actionInitialState
  );
  const [formState, setFormState] = useState<FormState>(formInitialState);
  let amountError, descriptionError;

  if (actionState.errors) {
    actionState.errors?.forEach((error) => {
      switch (error.placeholder) {
        case "Amount":
          amountError = error.message;
          break;
        case "Description":
          descriptionError = error.message;
          break;
      }
    });
  }

  useEffect(() => {
    console.log(actionState);
    if (actionState?.message === "Success") {
      setFormState((prevState) => ({ ...formInitialState }));
    }
      
  }, [actionState]);

  return (
    <form action={formAction}>
      <input hidden value={userId} name="userId" />
      <input
        type="text"
        placeholder="Amount"
        name="amount"
        className="border rounded-md p-2 w-full mb-2"
        value={Number(formState.amount)}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
          setFormState((prevData) => ({
            ...prevData,
            amount: Number(onlyNumbers),
          }));
        }}
      />
      {amountError && <FormError message={amountError} />}
      <textarea
        placeholder="Description"
        name="description"
        className="border rounded-md p-2 w-full mb-2"
        value={formState.description}
        onChange={(e) => {
          setFormState((prevData) => ({
            ...prevData,
            description: e.target.value,
          }));
        }}
      />
      {descriptionError && <FormError message={descriptionError} />}
      <select
        className="border rounded-md p-2 w-full mb-2"
        name="type"
        value={formState.type}
        onChange={(e) => {
          setFormState((prevData) => ({
            ...prevData,
            type: e.target.value,
          }));
        }}
      >
        {Object.values(TransactionTypes).map((value, key) => {
          return (
            <option key={key} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <SubmitButton />
    </form>
  );
}
