/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('employee').del()
  await knex('employee').insert([
    { employee_id: 3, department_id: 1, title: 'Operation Officer', day_rate: 750, active_status: 'WORKING', start_date: "2021-02-02 09:00:00" },
    { employee_id: 4, department_id: 1, title: 'Manager', day_rate: 900, active_status: 'WORKING', start_date: "2021-02-02 09:00:00" },
    { employee_id: 5, department_id: 2, title: 'Junior Developer', day_rate: 950, active_status: 'LAYOFF', start_date: "2021-02-02 09:00:00" },
  ]);
};
