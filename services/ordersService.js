/* const boom = require('@hapi/boom'); */
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class OrdersService {
  constructor() {}
  async create(data) {
    console.log(data);
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async createFromProfile(data) {
    const user = await models.Customer.findOne({
      where: {
        user_id: data.customerId,
      },
    });
    const customer = user.id;
    const newOrder = await models.Order.create({ customerId: customer });
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  async find() {
    const orders = await models.Order.findAll({ include: ['customer'] });
    return orders;
  }
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }
  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return id;
  }
}

module.exports = OrdersService;
