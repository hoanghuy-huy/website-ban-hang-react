module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Product", "thumbnailUrl", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Product", "thumbnailUrl", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
