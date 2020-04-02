'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'tasks',
        'type_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'types',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ),
      queryInterface.addColumn(
        'tasks',
        'status_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'status',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('tasks', 'type_id'),
      queryInterface.removeColumn('tasks', 'status_id')
    ]);
  }
};
