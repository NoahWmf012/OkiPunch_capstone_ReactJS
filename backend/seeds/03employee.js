/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('employee').del()
  await knex('employee').insert([
    /**table.increments();
        table.integer("employee_id");
        table.foreign("employee_id").references("users.id")
        table.integer("department_id");
        table.foreign("department_id").references("department.id");
        table.string("title");
        table.integer("day_rate");
        table.enu("active_status", ['READY', 'WORKING', 'SUSPENSION', 'LAYOFF']);
        table.time("start_date");
        table.timestamp('start_date').defaultTo(knex.fn.now()); */
    { employee_id: 3, department_id: 1, title: 'Operation Officer', day_rate: 750, active_status: 'WORKING', start_date: "2021-02-02 09:00:00" },
    { employee_id: 4, department_id: 1, title: 'Manager', day_rate: 900, active_status: 'WORKING', start_date: "2021-02-02 09:00:00" },
    { employee_id: 5, department_id: 2, title: 'Junior Developer', day_rate: 950, active_status: 'LAYOFF', start_date: "2021-02-02 09:00:00" },
  ]);
};
