/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('announcement_board').del()
  await knex('announcement_board').insert([
    { department_id: 1, announcement: 'rowValue1', created_at: '2022/9/1' },
    { department_id: 2, announcement: 'rowValue2', created_at: '2022/9/1' },
    { department_id: 3, announcement: 'rowValue3', created_at: '2022/9/1' }
  ]);
};
