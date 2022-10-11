/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('daily_attendance').del()
  await knex('daily_attendance').insert([
    { employee_id: 3, in_time: '08:59:50', out_time: '18:00:00', day_working_hour: '09:00:10', status: 'EARLY GOING', date: '05 Dec 2021' },
    { employee_id: 4, in_time: '08:59:55', out_time: '18:00:10', day_working_hour: '09:00:15', status: 'ON_TIME' },
    { employee_id: 5, status: 'ABSENT' },
    { employee_id: 3, in_time: '09:10:00', out_time: '18:00:01', day_working_hour: '08:50:01', status: 'LATE', date: '06 Dec 2021' },
    { employee_id: 4, in_time: '08:59:59', out_time: '17:50:10', day_working_hour: '08:50:11', status: 'EARLY GOING', date: '06 Dec 2021' },
    { employee_id: 5, in_time: '09:00:00', out_time: '18:50:00', day_working_hour: '09:50:00', status: 'ON_TIME', date: '07 Dec 2021' },
    { employee_id: 3, in_time: '09:00:30', out_time: '18:00:30', day_working_hour: '09:00:00', status: 'ON_TIME', date: '07 Dec 2021' },
    { employee_id: 4, in_time: '16:00:00', out_time: '20:50:00', day_working_hour: '04:50:00', status: 'HALF DAY', date: '08 Dec 2021' },
    { employee_id: 5, in_time: '08:50:00', out_time: '18:00:00', day_working_hour: '09:10:00', status: 'EARLY GOING', date: '08 Dec 2021' },
    { employee_id: 4, in_time: '08:50:00', date: '09 Dec 2021' },
    { employee_id: 4, in_time: '08:50:00', date: '10 Dec 2021' },
    { employee_id: 4, in_time: '08:50:00', date: '11 Dec 2021' },
  ]);
};
