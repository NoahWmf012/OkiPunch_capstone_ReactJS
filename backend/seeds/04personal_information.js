/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('personal_information').del()
  await knex('personal_information').insert([
    /**table.integer("employee_id").unsigned().primary();
        table.foreign('employee_id').references('employee.id');
        table.string("fName");
        table.string("lName");
        table.string("alias");
        table.integer("phone_number");
        table.string("address");
        table.enu('gender', ['male', 'female']);
        table.date("date_of_birth"); */
    { employee_id: 1, fName: 'Rajesh', lName: 'Lam', alias: 'Ricky', phone_number: 61612828, address: 'Mong Kok', gender: 'male', date_of_birth: '1999-01-08' },
    { employee_id: 2, fName: 'Pallavi', lName: 'Lee', alias: 'Sam', phone_number: 67671100, address: 'NT', gender: 'male', date_of_birth: '1999-06-04' },
    { employee_id: 3, fName: 'Kirti', lName: 'White', alias: 'Lily', phone_number: 67679090, address: 'Tsun Wan', gender: 'female', date_of_birth: '1999-07-21' },
  ]);
};
