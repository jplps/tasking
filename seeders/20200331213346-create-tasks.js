'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', [
      {
        description: 'Implement Seeds',
        type: 'backend',
        status: 'open',
        owner_id: '2',
        created_at: new Date(),
        updated_at: new Date(),
        finished_at: null
      },
      {
        description: 'Run Seeds',
        type: 'backend',
        status: 'closed',
        owner_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
        finished_at: new Date()
      },
      {
        description: 'Check Seeds',
        type: 'backend',
        status: 'open',
        owner_id: '2',
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
