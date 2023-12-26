import * as bcrypt from "bcrypt";
import User from "../models/user";

export default async function createUser(userData: User) {
  const hashPassword = await bcrypt.hash(userData.password, 10);

  const user: User = await User.create({
    data: { ...userData, password: hashPassword },
  });

  return user;
}
