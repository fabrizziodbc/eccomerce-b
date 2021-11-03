const Joi = require('joi');

const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const img = Joi.string().uri();
const description = Joi.string().min(10);
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const minPrice = Joi.number().integer();
const maxPrice = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: img.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: img,
  description: description,
  categoryId: categoryId,
});
const getProductSchema = Joi.object({
  id: id.required(),
});
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  maxPrice,
  minPrice,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
