const passport = require('passport');
const express = require('express');
const OrdersService = require('../services/ordersService');

const router = express.Router();
const service = new OrdersService();
//Todos las categorias
router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/add-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const data = { customerId: req.user.sub };
    try {
      const newOrder = await service.createFromProfile(data);
      res.json({ message: 'created', data: newOrder });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
