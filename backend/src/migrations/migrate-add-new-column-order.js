module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("OrderDetail", "returnItem", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("OrderDetail", "status", {
        type: Sequelize.BOOLEAN,
      }),
      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("OrderDetail", "returnItem"),  
      queryInterface.removeColumn("OrderDetail", "status"),  
    ]);
  },
};
