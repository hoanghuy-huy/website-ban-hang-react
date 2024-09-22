'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsTo(models.Address, { foreignKey: 'addressId' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    status:DataTypes.INTEGER,
    quantityItem: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    totalDiscount: DataTypes.INTEGER,
    orderPaymentStatus: DataTypes.INTEGER,
    orderStatusDelivery: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    deliveryMethodName: DataTypes.STRING,
    deliveryMethodFee: DataTypes.INTEGER,
    recipientName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};