"use strict";
const faker = require("faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const smartphone = [];

    for (let i = 0; i < 50; i++) {
      smartphone.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        qty: faker.datatype.number(),
        UserId: faker.datatype.number({
          min: 1,
          max: 5,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Smartphones", smartphone, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Smartphones", null, {});
  },
};
