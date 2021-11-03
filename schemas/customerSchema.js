const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(30);
const lastName = Joi.string().max(30);
const phone = Joi.string().min(6);
const userId = Joi.number().integer();
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const password = Joi.string();
const img = Joi.string().uri();
const role = Joi.string().min(5);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    image: img,
    role: role,
  }).required(),
});
const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});
const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
