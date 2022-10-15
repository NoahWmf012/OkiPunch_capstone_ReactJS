/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('salary').del()
  await knex('salary').insert([
    { employee_id: 3, day_rate: 750, work_status: 'FULL_DAY', work_date: '2022/10/5', daily_salary: 750 },
    { employee_id: 4, day_rate: 900, work_status: 'FULL_DAY', work_date: '2022/10/5', daily_salary: 900 },
    { employee_id: 3, day_rate: 750, work_status: 'FULL_DAY', work_date: '2022/10/6', daily_salary: 750 },
    { employee_id: 4, day_rate: 900, work_status: 'HALF_DAY', work_date: '2022/10/5', daily_salary: 450 },
    { employee_id: 5, day_rate: 950, work_status: 'FULL_DAY', work_date: '2022/10/7', daily_salary: 475 },
    { employee_id: 3, day_rate: 750, work_status: 'FULL_DAY', work_date: '2022/10/7', daily_salary: 750 },
    { employee_id: 4, day_rate: 900, work_status: 'HALF_DAY', work_date: '2022/10/5', daily_salary: 450 },
    { employee_id: 5, day_rate: 950, work_status: 'HALF_DAY', work_date: '2022/10/8', daily_salary: 475 },

  ]);
};
