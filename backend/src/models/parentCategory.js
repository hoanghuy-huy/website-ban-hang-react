'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParentCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParentCategory.hasMany(models.ChildCategory)
    }
  }
  ParentCategory.init({
    name: DataTypes.STRING,
    hot: DataTypes.BOOLEAN,
    path:DataTypes.STRING,
    description: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'ParentCategory',
  });
  return ParentCategory;
};