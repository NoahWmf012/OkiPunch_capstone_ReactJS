/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('department').del()
  await knex('department').insert([
    { name: 'Operating' },
    { name: 'R&D' },
    { name: 'Frontdesk' }
  ]);
};
