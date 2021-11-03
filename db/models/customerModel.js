const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./userModel');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order, {as: "orders", foreignKey: "customerId"})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}
module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
