module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("OrderDetail", "totalPrice", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("OrderDetail", "statusReview", {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("OrderDetail", "totalPrice"),
      queryInterface.removeColumn("OrderDetail", "statusReview"),
    ]);
  },
};
