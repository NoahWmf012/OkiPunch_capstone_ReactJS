/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('personal_information', (table) => {
        table.integer("employee_id").primary();
        table.foreign('employee_id').references('employee.employee_id');
        table.string("fName");
        table.string("lName");
        table.string("alias");
        table.integer("phone_number");
        table.string("address");
        table.string("email");
        table.enu('gender', ['male', 'female']);
        table.date("date_of_birth");
        //table.binary("image_icon");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('personal_information');
};
