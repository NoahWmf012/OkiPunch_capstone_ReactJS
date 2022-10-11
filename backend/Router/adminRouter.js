const jwt = require("jsonwebtoken");
var QrCode = require('qrcode-reader');
class comAuthRouter {
    constructor(express, passport, bcrypt, knex) {
        this.express = express;
        this.passport = passport;
        this.bcrypt = bcrypt;
        this.knex = knex;
    }

    //check is admin
    isAdminLogged(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === "admin") {
                return next();
            }
            res.send("Only admin is allowed to enter this page");
        }
        res.redirect("/admin_login");
    }

    router() {
        let router = this.express.Router();

        router.post("/login", async (req, res) => {
            //handle email and password login
            const { username, password } = req.body;
            let user = await this.knex("users").where({ username }).first();
            if (user) {
                //check role first
                if (user.role != 'admin') {
                    res.status(401).json("Invalid username.");
                    return;
                }
                //check password
                this.bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            role: user.role
                        }
                        const token = jwt.sign(payload, process.env.JWT_SECRET);
                        res.json({ token });
                    } else {
                        res.status(401).json("Invalid password.");
                    }
                });
            } else {
                res.status(401).json("Invalid username.");
            }
        });

        router.get("/punch/:employee_id", async (req, res) => {
            //table: daily_attendance
            let employee_id = req.params.employee_id;
            try {
                let data = await this.knex('daily_attendance').where({ employee_id });
                res.json(data);
            } catch (error) {
                res.json("Invalide to get punch record: ", error);
            }
        })

        router.post("/punchin", async (req, res) => {
            //table: daily_attendance
            let { employee_id, in_time, date } = req.body;
            let data = await this.knex('daily_attendance').insert({ employee_id, in_time, date }).returning("id");
            res.json(data);
        })

        router.put("/punchedit", async (req, res) => {
            //table: daily_attendance, salary
            let { id, in_time, out_time, day_working_hour, status } = req.body;
            //status Enum('ON_TIME', 'LATE', 'ABSENT', 'EARLY GOING', 'HALF DAY')
            let data = await this.knex('daily_attendance').where({ id }).first();
            if (data) {
                try {
                    let data = await this.knex('daily_attendance').where('id', `${id}`).update({ in_time, out_time, day_working_hour, status });
                    res.json(data);
                } catch (error) {
                    res.status(404).json("No record:", error);
                }
            } else {
                res.status(404).json("Invalid to edit punch record:", error);
            }
        })

        //knex get all employees
        router.get("/showallworkers", async (req, res) => {
            //table: employee
            try {
                let data = await this.knex('employee').join('department', 'department.id', 'employee.department_id').select('employee.id', 'department.department_name', 'employee.title', 'employee.day_rate', 'employee.active_status', 'employee.start_date');
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to show all employees:", error);
            }

        })

        //knex get all employees
        router.get("/showone/:id", async (req, res) => {
            //table: personal_information
            //display btn Link to calendar
            let id = req.params.id;
            try {
                let data = await this.knex('personal_information').join('employee', 'employee.id', 'personal_information.employee_id').select('*').where('personal_information.employee_id', `${id}`);
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to show one:", error);
            }
        })

        //knex insert new employee
        router.post("/addnewemployee", async (req, res) => {
            //table: users, employee, personal_information
            let { username, email, password, department_id, title, day_rate, start_date, fName, lName, alias, phone_number, address, gender, date_of_birth, image } = req.body;

            //check if the username / email exist
            let user = await this.knex('users').where({ username }).first();
            if (user) {
                res.status(404).json(`This username: ${user.username} already exists`);
                return;
            }
            let emailUser = await this.knex('users').where({ email }).first();
            if (emailUser) {
                res.status(404).json(`This email: ${emailUser.email} already exists`);
                return;
            }

            try {
                let hash_password = await this.bcrypt.hash(password, 10);
                let id = await this.knex('users').insert({ username, email, password: hash_password, role: 'employee' }).returning('id');
                await this.knex('employee').insert({ employee_id: id[0].id, title, department_id, day_rate, active_status: 'READY', start_date });
                let data = await this.knex('personal_information').insert({ employee_id: id[0].id, fName, lName, alias, phone_number, address, gender, date_of_birth }).returning(['fName', 'lName']);//skip image
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to add new employee:", error);
            }
        })

        //knex get announcement history
        router.get("/announcement", async (req, res) => {
            // table: announcement_board
            try {
                let data = await this.knex('announcement_board').join('department', 'announcement_board.department_id', 'department.id').select('*');
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to get announcement hostory:", error)
            }
        })

        //knex update announcement history
        router.put("/announcement/:id", async (req, res) => {
            // table: announcement_board
            let id = req.params.id;
            let { announcement } = req.body;
            try {
                let data = await this.knex('announcement_board').update({ announcement }).where('id', `${id}`).returning('announcement');
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to update announcement hostory:", error);
            }
        })

        //knex insert new announcement
        router.post("/announcement", async (req, res) => {
            //table: announcement_board
            let { department_id, announcement } = req.body;
            try {
                let data = await this.knex('announcement_board').insert({ department_id, announcement }).returning("announcement");
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to post new announcement:", error);
            }

        })

        //knex get calendar history
        router.get("/calendar/:id", async (req, res) => {
            //table: daily_attendance, salary
            let id = req.params.id;
            try {
                let data = await this.knex('daily_attendance').join('salary', 'daily_attendance.employee_id', 'salary.employee_id').select('daily_attendance.employee_id', 'daily_attendance.in_time', 'daily_attendance.out_time', 'daily_attendance.status', 'salary.work_date').where('daily_attendance.employee_id', `${id}`);
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to get calendar:", error);
            }
        })

        //knex get e-statement
        router.get("/estatement/:id", async (req, res) => {
            //table: salary
            let id = req.params.id;
            try {
                let data = await this.knex('salary').select('employee_id', this.knex.raw('SUM(daily_salary)')).where('employee_id', `${id}`).groupBy('employee_id');
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to get e-statement:", error);
            }

        })

        //knex set employee > active_status
        router.delete("/layoff/:id", async (req, res) => {
            //table: employee
            let id = req.params.id;
            try {
                let data = await this.knex('employee').update({ active_status: "LAYOFF" }).where('id', `${id}`).returning(['id', 'active_status']);
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to layoff:", error);
            }
        })

        return router;
    }
}

module.exports = comAuthRouter;
