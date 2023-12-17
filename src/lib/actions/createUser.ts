import md5 from 'md5';
import User from "../models/user";

export default async function createUser(userData: User) {
  const hashPassword = md5(userData.password);

  const user: User = await User.create({ data: {...userData, password: hashPassword } });

  return user;
}
