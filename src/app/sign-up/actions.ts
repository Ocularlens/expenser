"use server";
import createUser from "@/lib/actions/createUser";
import { capitalize } from "@/lib/utils/capitalize";
import { signupSchema } from "@/lib/validationSchema/signupSchema";

export async function submitForm(prevState: any, formData: FormData) {
  const userForm = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    fullname: formData.get("fullname") as string,
  };

  const { error } = signupSchema.validate(userForm, { abortEarly: false });

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

  const user: User = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    fullname: formData.get("fullname") as string,
    isActive: true,
  };

  await createUser(user);

  return { message: "User registered" };
}
