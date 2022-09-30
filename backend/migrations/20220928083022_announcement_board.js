/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('announcement_board', (table) => {
        table.increments().primary();
        table.integer("department_id");
        table.foreign("department_id").references("department.id");
        table.string("announcement");
        // table.time('created_at');
        table.timestamps(true, false); //create_at & updated_at as paras
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('announcement_board');
};
