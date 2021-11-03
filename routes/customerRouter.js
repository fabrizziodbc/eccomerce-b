const express = require('express');
const CustomerService = require('../services/customerService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customerSchema');

const router = express.Router();
const service = new CustomerService();
//Todos los clientes
router.get('/', async (req, res, next) => {
  try {
    const customer = await service.find();
    res.json(customer);
  } catch (error) {
    next(error);
  }
});
//Cliente según ID
router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
//Nuevo cliente
router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const createCustomer = await service.create(body);
      res.json({
        message: 'created',
        data: createCustomer,
      });
    } catch (error) {
      next(error);
    }
  }
);
//Modificar cliente
router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.json({
      message: 'updated',
      data: customer,
    });
  }
);
//Eliminar cliente
router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const customerDelete = await service.delete(id);
    res.json({
      customerDelete,
    });
  }
);

module.exports = router;
