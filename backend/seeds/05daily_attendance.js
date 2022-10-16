/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('daily_attendance').del()
  await knex('daily_attendance').insert([
    { employee_id: 3, in_time: '08:59:50', out_time: '18:00:00', day_working_hour: '09:00:10', status: 'FULL_DAY', date: '2022-10-05T00:00:00.000Z' },
    { employee_id: 4, in_time: '08:59:55', out_time: '18:00:10', day_working_hour: '09:00:15', status: 'FULL_DAY', date: '2022-10-05T00:00:00.000Z' },
    { employee_id: 3, in_time: '09:10:00', out_time: '18:00:01', day_working_hour: '08:50:01', status: 'FULL_DAY', date: '2022-10-06T00:00:00.000Z' },
    { employee_id: 4, in_time: '08:59:59', out_time: '12:50:10', day_working_hour: '03:50:11', status: 'HALF_DAY', date: '2022-10-06T00:00:00.000Z' },
    { employee_id: 5, in_time: '09:00:00', out_time: '18:50:00', day_working_hour: '09:50:00', status: 'FULL_DAY', date: '2022-10-07T00:00:00.000Z' },
    { employee_id: 3, in_time: '09:00:30', out_time: '18:00:30', day_working_hour: '09:00:00', status: 'FULL_DAY', date: '2022-10-07T00:00:00.000Z' },
    { employee_id: 4, in_time: '16:00:00', out_time: '20:00:00', day_working_hour: '04:00:00', status: 'HALF_DAY', date: '2022-10-08T00:00:00.000Z' },
    { employee_id: 5, in_time: '08:50:00', out_time: '13:00:00', day_working_hour: '04:10:00', status: 'HALF_DAY', date: '2022-10-08T00:00:00.000Z' },
  ]);
};
