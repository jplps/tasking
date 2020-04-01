'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
      {
        name: 'open',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'closed',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null);
  }
};
