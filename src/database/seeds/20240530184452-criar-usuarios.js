'use strict';
const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    await queryInterface.bulkInsert('users',
      [{
        nome: 'Fernando',
        email: 'fernandohrsilv@gmail.com',
        password_hash: await bcryptjs.hash('123456789', 8),
        created_at: new Date(),
        updated_at: new Date(),
      }],
      {});
  },

  async down() {
  }
};
