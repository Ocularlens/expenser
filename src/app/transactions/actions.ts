"use server";
import createTransaction from "@/lib/actions/createTransaction";
import { capitalize } from "@/lib/utils/capitalize";
import { createTransactionSchema } from "@/lib/validationSchema/createTransactionSchema";
import { revalidatePath } from "next/cache";

export async function newTransaction(prevState: any, formData: FormData) {
  const transactionForm = {
    amount: Number(formData.get("amount") as string),
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    userId: Number(formData.get("userId")),
  };

  const { error } = createTransactionSchema.validate(transactionForm, {
    abortEarly: false,
  });

  if (error) {
    const { details } = error;
    const errors = details.map((i) => {
      const firstDQ = i.message.indexOf('"') + 1;
      const lastDQ = i.message.lastIndexOf('"');
      const placeholder = capitalize(i.message.substring(firstDQ, lastDQ));

      return { message: capitalize(i.message.replace(/\"/g, "")), placeholder };
    });

    return { errors };
  }

  const newTransaction = await createTransaction({
    ...transactionForm,
  });

  if (!newTransaction) return { message: "Server Error" };
  revalidatePath("/transactions");
  return { message: "Success" };
}
