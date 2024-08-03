"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: "Product_User",
        foreignKey: "productId",
      });
      Product.belongsTo(models.ChildCategory);
      Product.hasMany(models.ProductImage, { foreignKey: "productId" });
      Product.hasOne(models.DetailProduct, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      childCategoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      hot: DataTypes.BOOLEAN,
      authentic: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      originalPrice: DataTypes.INTEGER,
      thumbnailUrl: DataTypes.STRING,
      discountRate: DataTypes.STRING,
      brandName: DataTypes.STRING,
      totalRating: DataTypes.INTEGER,
      starsNumber: DataTypes.INTEGER,
      inventoryNumber: DataTypes.INTEGER,
      quantitySold: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
