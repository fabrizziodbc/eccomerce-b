const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./categoryModel');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}
module.exports = { PRODUCT_TABLE, ProductSchema, Product };
