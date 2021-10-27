const express = require('express');
const UserService = require('../services/usersService');
const router = express.Router();
const service = new UserService();
//Todos los usuario
router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});
//Usuario según ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});
//Nuevo usuario
router.post('/', (req, res) => {
  const body = req.body;
  const createUser = service.create(body);
  res.json({
    message: 'created',
    data: createUser,
  });
});
//Modificar usuario
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json({
    message: 'updated',
    data: user,
  });
});
//Eliminar usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userDelete = service.delete(id);
  res.json({
    userDelete,
  });
});

module.exports = router;
