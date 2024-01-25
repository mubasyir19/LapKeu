'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('journal', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      id_account: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      id_coa: {
        type: Sequelize.STRING,
      },
      debit: {
        type: Sequelize.NUMBER,
      },
      kredit: {
        type: Sequelize.NUMBER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('journal');
  },
};
