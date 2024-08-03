"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailProduct", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING,
      },
      brandCountry: {
        type: Sequelize.STRING,
      },
      warrantyTimePeriod: {
        type: Sequelize.STRING,
      },
      capacity: {
        type: Sequelize.STRING,
      },
      isWarrantyApplied: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      power: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      productWeight: {
        type: Sequelize.STRING,
      },
      safeMode: {
        type: Sequelize.STRING,
      },
      timerMode: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("DetailProduct");
  },
};
