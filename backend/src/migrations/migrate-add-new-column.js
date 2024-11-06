module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Order", "statusReturnProduct", {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Order", "statusReturnProduct"),  
    ]);
  },
};
