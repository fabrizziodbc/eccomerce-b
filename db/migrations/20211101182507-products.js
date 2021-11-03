'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('./../models/productModel');
const { CATEGORY_TABLE, CategorySchema } = require('./../models/categoryModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      PRODUCT_TABLE,
      'description',
      ProductSchema.description
    );
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
