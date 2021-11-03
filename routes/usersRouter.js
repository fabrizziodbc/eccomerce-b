const express = require('express');
const UserService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/userSchema');

const router = express.Router();
const service = new UserService();
//Todos los usuario
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
//Usuario según ID
router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
//Nuevo usuario
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const createUser = await service.create(body);
      res.json({
        message: 'created',
        data: createUser,
      });
    } catch (error) {
      next(error);
    }
  }
);
//Modificar usuario
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json({
      message: 'updated',
      data: user,
    });
  }
);
//Eliminar usuario
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const userDelete = await service.delete(id);
    res.json({
      userDelete,
    });
  }
);

module.exports = router;
