'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ValueDetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ValueDetailProduct.belongsTo(models.DetailProduct)
    }
  }
  ValueDetailProduct.init({
    detailProductId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ValueDetailProduct',
  });
  return ValueDetailProduct;
};