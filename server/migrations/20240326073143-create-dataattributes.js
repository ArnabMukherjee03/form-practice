'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dataattributes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attribute: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.STRING
      },
      choosed: {
        type: Sequelize.STRING
      },
      data_id:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      references: {
        model: 'data',
        key: 'id',
        as: 'data_id',
      }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dataattributes');
  }
};