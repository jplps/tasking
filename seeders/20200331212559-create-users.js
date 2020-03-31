'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'João Pedro Pacheco',
        email: 'joao.pedro.pacheco@hotmail.com',
        password: 'jplps2020',
        role: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Priscila Nunes',
        email: 'priscila.nunes@anestech.com.br',
        password: 'prinunes2020',
        role: 'AGENT',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null);
  }
};
