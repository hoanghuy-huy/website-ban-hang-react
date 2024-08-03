'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChildCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChildCategory.hasMany(models.Product, {foreignKey : 'childCategoryId'})
      ChildCategory.belongsTo(models.ParentCategory)
    }
  }
  ChildCategory.init({
    name: DataTypes.STRING,
    hot: DataTypes.BOOLEAN,
    path:DataTypes.STRING,
    parentCategoryId: DataTypes.INTEGER, 
    description: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'ChildCategory',
  });
  return ChildCategory;
};