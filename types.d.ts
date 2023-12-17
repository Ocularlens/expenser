type User = {
  id?: number,
  username: string,
  fullname: string,
  isActive: boolean,
  password: string,
  createdDate?: Date,
  updatedDate?: Date
};

type Transaction = {
  id: number,
  userId: number,
  amount: number,
  description: string,
  type: string,
  createdDate: Date,
  updatedDate: Date
};