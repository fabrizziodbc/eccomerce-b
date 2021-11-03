const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();
//Todos los productos
router.get(
  '/',
  validatorHandler(queryProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);
//Productos según ID
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
//Nuevo Producto
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const createProduct = await service.create(body);
    res.json({
      message: 'created',
      data: createProduct,
    });
  }
);
//Modificar producto
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'updated',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);
//Eliminar producto
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const productDelete = await service.delete(id);
    res.json({
      productDelete,
    });
  }
);

module.exports = router;
