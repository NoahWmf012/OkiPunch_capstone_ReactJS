/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('salary').del()
  await knex('salary').insert([
    { employee_id: 1, day_rate: 750, work_status: 'FULL_DAY', work_date: '2022/9/30', daily_salary: 750 },
    { employee_id: 2, day_rate: 900, work_status: 'FULL_DAY', work_date: '2022/9/30', daily_salary: 900 },
    { employee_id: 3, day_rate: 950, work_status: 'HALF_DAY', work_date: '2022/9/29', daily_salary: 475 },
    { employee_id: 3, day_rate: 950, work_status: 'FULL_DAY', work_date: '2022/9/30', daily_salary: 950 },

  ]);
};
