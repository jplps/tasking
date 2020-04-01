'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'João Pedro Pacheco',
        email: 'joao.pedro.pacheco@hotmail.com',
        password: await bcrypt.hash('jplps2020', 10),
        role: 'ADMIN',
        department_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Priscila Nunes',
        email: 'priscila.nunes@anestech.com.br',
        password: await bcrypt.hash('prinunes2020', 10),
        role: 'AGENT',
        department_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null);
  }
};
