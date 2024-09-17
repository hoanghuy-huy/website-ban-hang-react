'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User)
    }
  }
  Address.init({
    userId: DataTypes.INTEGER,
    recipientName: DataTypes.STRING,
    phone: DataTypes.STRING,
    city:DataTypes.STRING,
    district:DataTypes.STRING,
    ward:DataTypes.STRING,
    address:DataTypes.STRING,
    typeAddress:DataTypes.STRING,
    defaultAddress:DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};