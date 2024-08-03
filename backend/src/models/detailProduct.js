"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailProduct.belongsTo(models.Product)
      DetailProduct.hasMany(models.ValueDetailProduct, {foreignKey : "detailProductId"})
    }
  }
  DetailProduct.init(
    {
      productId: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      brandCountry: DataTypes.STRING,
      warrantyTimePeriod: DataTypes.STRING,
      capacity: DataTypes.STRING,
      isWarrantyApplied: DataTypes.STRING,
      material: DataTypes.STRING,
      power: DataTypes.STRING,
      origin: DataTypes.STRING,
      productWeight: DataTypes.STRING,
      safeMode: DataTypes.STRING,
      timerMode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DetailProduct",
    }
  );
  return DetailProduct;
};
