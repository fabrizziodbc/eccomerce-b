const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {}
  async create(data) {
    const newProduct = models.Product.create(data);
    return newProduct;
  }
  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset, price, maxPrice } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }
    if (query.minPrice) {
      options.where.price = { [Op.gte]: query.minPrice };
    }
    if (maxPrice) {
      options.where.price = { [Op.lte]: maxPrice };
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }
  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }
  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return id;
  }
}

module.exports = ProductsService;
