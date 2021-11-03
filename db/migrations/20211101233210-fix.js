'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('./../models/productModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      PRODUCT_TABLE,
      'category_id',
      ProductSchema.id
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
  },
};
