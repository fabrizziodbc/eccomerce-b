'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./../models/userModel');
const { PRODUCT_TABLE } = require('./../models/productModel');
const { CUSTOMER_TABLE } = require('./../models/customerModel');
const { CATEGORY_TABLE } = require('./../models/categoryModel');
const { ORDER_TABLE } = require('./../models/orderModel');
const { ORDER_PRODUCT_TABLE } = require('./../models/order-productModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowdNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowdNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowdNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer',
      },
      createAt: {
        allowdNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowdNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowdNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      createAt: {
        allowdNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowdNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowdNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      createAt: {
        allowdNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
      categoryId: {
        field: 'category_id',
        allowdNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          keys: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowdNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowdNull: false,
        field: 'last_name',
        type: DataTypes.STRING,
      },
      phone: {
        allowdNull: false,
        type: DataTypes.STRING,
      },
      createAt: {
        allowdNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
      userId: {
        field: 'user_id',
        allowdNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowdNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowdNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createAt: {
        allowdNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowdNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createAt: {
        allowdNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      },
      amount: {
        allowdNull: false.valueOf,
        type: DataTypes.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowdNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productId: {
        field: 'product_id',
        allowdNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
