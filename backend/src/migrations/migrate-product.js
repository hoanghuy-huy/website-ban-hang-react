"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      brandId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      hot: {
        type: Sequelize.BOOLEAN,
      },
      authentic: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      originalPrice: {
        type: Sequelize.INTEGER,
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
      },
      discountRate: {
        type: Sequelize.INTEGER,
      },
      brandName: {
        type: Sequelize.STRING,
      },
      totalRating: {
        type: Sequelize.INTEGER,
      },
      starsNumber: {
        type: Sequelize.INTEGER,
      },
      inventoryNumber: {
        type: Sequelize.INTEGER,
      }, 
      quantitySold: {
        type: Sequelize.INTEGER,
      },       
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product");
  },
};
