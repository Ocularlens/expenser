import Joi from "joi";

export const createTransactionSchema: Joi.ObjectSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  description: Joi.string().required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  userId: Joi.number().required(),
});
