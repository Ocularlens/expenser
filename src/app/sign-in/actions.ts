import { capitalize } from "@/lib/utils/capitalize";
import { loginSchema } from "@/lib/validationSchema/loginSchema";

export async function submitForm(prevState: any, formData: FormData) {
  const userForm = {
    username: formData.get("username") as string,
    fullname: formData.get("fullname") as string,
  };

  const { error } = loginSchema.validate(userForm, { abortEarly: false });

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

  return { message: "Success" };
}