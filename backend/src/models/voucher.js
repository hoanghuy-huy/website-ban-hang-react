"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher.init(
    {
      discount: {
        type: DataTypes.STRING,
      },
      condition: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
      },
      expiryDate: {
        type: DataTypes.DATE,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
      },
      freeShipping: {
        type: DataTypes.BOOLEAN,
      },
      discountValue: {
        type: DataTypes.FLOAT,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      conditionValue: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
