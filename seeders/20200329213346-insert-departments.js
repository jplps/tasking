'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('departments', [
      {
        name: 'Development',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Administration',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Human Resources',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('departments', null);
  }
};
