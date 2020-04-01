'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', [
      {
        name: 'frontend',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'backend',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null);
  }
};
