/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('employee', (table) => {
        table.increments().primary();
        table.integer("employee_id").unique();
        table.foreign("employee_id").references("users.id");
        table.integer("department_id");
        table.foreign("department_id").references("department.id");
        table.string("title");
        table.integer("day_rate");
        table.enu("active_status", ['READY', 'WORKING', 'SUSPENSION', 'LAYOFF']);
        table.time("start_date");
        // table.timestamp('start_date').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('employee');
};
