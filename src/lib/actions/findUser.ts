import User from "../models/user";

export default async function findUser(username: string) {
  const user = await User.findFirst({
    where: {
      username,
    }
  });

  if (user === null) return false;

  return user;
}
