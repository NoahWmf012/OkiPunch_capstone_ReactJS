/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('department').del()
  await knex('department').insert([
    { department_name: 'Operating' },
    { department_name: 'R&D' },
    { department_name: 'Frontdesk' }
  ]);
};
