'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/productModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
