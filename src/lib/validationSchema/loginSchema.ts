import Joi from "joi";

export const loginSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
