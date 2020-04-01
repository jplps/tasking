'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', [
      {
        description: 'Implement Seeds',
        owner_id: '2',
        type_id: '1',
        status_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        finished_at: null
      },
      {
        description: 'Run Seeds',
        owner_id: '1',
        type_id: '2',
        status_id: '2',
        created_at: new Date(),
        updated_at: new Date(),
        finished_at: new Date()
      },
      {
        description: 'Check Seeds',
        owner_id: '2',
        type_id: '1',
        status_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        finished_at: null
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null);
  }
};
