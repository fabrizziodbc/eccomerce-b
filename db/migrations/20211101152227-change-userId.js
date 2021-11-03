'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customerModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowdNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    });
  },

  down: async () => {
    //
  },
};
