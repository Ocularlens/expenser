import Joi from "joi";

export const signupSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
});
