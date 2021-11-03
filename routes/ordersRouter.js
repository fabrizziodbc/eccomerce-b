const express = require('express');
const OrdersService = require('../services/ordersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/orderSchema');

const router = express.Router();
const service = new OrdersService();
//Todas las ordenes
router.get('/', async (req, res, next) => {
  try {
    const order = await service.find();
    res.json(order);
  } catch (error) {
    next(error);
  }
});
//Orden según ID
router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
//Nueva orden
router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const createOrder = await service.create(body);
      res.json({
        message: 'created',
        data: createOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);
//Agregar items a la orden
router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.json({
        message: 'added',
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);
//Modificar orden
router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const order = await service.update(id, body);
    res.json({
      message: 'updated',
      data: order,
    });
  }
);
//Eliminar cliente
router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const customerDelete = await service.delete(id);
    res.json({
      customerDelete,
    });
  }
);

module.exports = router;
