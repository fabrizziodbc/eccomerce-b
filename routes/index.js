const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const customerRouter = require('./customerRouter');
const categoryRouter = require('./categoryRouter');
const ordersRouter = require('./ordersRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoryRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
};

module.exports = routerApi;
