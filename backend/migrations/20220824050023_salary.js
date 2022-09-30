/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('salary', (table) => {
        table.increments().primary();
        table.integer("employee_id").unsigned();
        table.foreign('employee_id').references('employee.id');
        table.integer("day_rate");
        // table.foreign("day_rate").references("employee.day_rate");
        table.enu('work_status', ['HALF_DAY', 'FULL_DAY'])
        table.date("work_date");//current year & month & day 
        // table.foreign("work_date").references("daily_attendance.out_time")
        table.decimal("daily_salary");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('salary');
};
