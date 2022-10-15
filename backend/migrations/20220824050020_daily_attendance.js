/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('daily_attendance', (table) => {
        table.increments().primary();
        table.integer("employee_id").unsigned();
        table.foreign('employee_id').references('employee.employee_id');
        table.time('in_time');
        table.time('out_time');
        table.time("day_working_hour");
        table.date('date');
        table.enu('status', ['ON_TIME', 'LATE', 'ABSENT', 'EARLY GOING', 'HALF_DAY', 'FULL_DAY'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('daily_attendance');
};
