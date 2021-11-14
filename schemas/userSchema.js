const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const password = Joi.string().min(6);
const img = Joi.string().uri();
const role = Joi.string().min(5);
const token = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  image: img,
  role: role,
});
const updateUserSchema = Joi.object({
  email: email,
  password: password,
  image: img,
  role: role,
});
const getUserSchema = Joi.object({
  id: id.required(),
});
const recoverySchema = Joi.object({
  email: email.required(),
});
const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: password.required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('newPassword')),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  recoverySchema,
  changePasswordSchema,
};
