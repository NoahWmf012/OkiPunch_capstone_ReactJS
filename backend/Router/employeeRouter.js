const jwt = require("jsonwebtoken");
const { createClient } = require("redis");
var QRCode = require('qrcode');

var setJson = {
    "employee_id": "1",
    "role": "employee"
}

const stJon = JSON.stringify(setJson);

QRCode.toFile(
    'qr.png',
    stJon, function (err) {
        if (err) {
            return console.log("QRCode error:", err);
        }
    }
)
class emAuthRouter {
    constructor(express, passport, bcrypt, knex) {
        this.express = express;
        this.passport = passport;
        this.bcrypt = bcrypt;
        this.knex = knex;
    }

    isAdminLogged(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === "employee") {
                return next();
            }
            res.send("Only employee is allowed to enter this page");
        }
        res.redirect("/employee_login");
    }



    router() {
        let router = this.express.Router();

        router.post("/login", async (req, res) => {
            //handle email and password login
            const { username, password } = req.body;
            let user = await this.knex("users").where({ username }).first();
            if (user) {
                //check role first
                if (user.role != 'employee') {
                    res.status(401).json("Invalid username.");
                    return;
                }
                //check password
                try {
                    this.bcrypt.compare(password, user.password, function (err, result) {
                        console.log("Login success:", user.role)
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
                } catch (error) {
                    res.status(401).json("Invalid to login:", error);
                }
            } else {
                res.status(401).json("Invalid username.");
            }
        });

        //for calendar display
        router.get("/calendar/:employee_id", async (req, res) => {
            //table: daily_attendance
            let employee_id = req.params.employee_id;
            try {
                let data = await this.knex('daily_attendance').where({ employee_id });
                let _data = await this.knex('daily_attendance').where({ employee_id }).select('id', 'date')
                res.json(data);
            } catch (error) {
                res.json("Invalide to get punch record: ", error);
            }
        })

        //for punch-in / punch-put
        router.get("/punch/:employee_id", async (req, res) => {
            //table: daily_attendance
            let employee_id = req.params.employee_id;
            try {
                let data = await this.knex('daily_attendance').where({ employee_id }).andWhere("out_time", 'is', null).whereNotNull("date").orderBy('date', 'desc').limit(1).first();
                res.json(data);
            } catch (error) {
                res.json("Invalide to get punch record: ", error);
            }
        })

        //for getting day_rate
        router.get("/day_rate/:employee_id", async (req, res) => {
            //table: daily_attendance
            let employee_id = req.params.employee_id;
            try {
                let data = await this.knex('employee').where({ employee_id }).select('day_rate').first();
                res.json(data);
            } catch (error) {
                res.json("Invalide to get day_rate record: ", error);
            }
        })
        //for adding new salay data
        router.post("/day_rate", async (req, res) => {
            //table: daily_attendance
            // let employee_id = req.params.employee_id;
            let { employee_id, day_rate, work_status, work_date, daily_salary } = req.body;
            try {
                let data = await this.knex('salary').insert({ employee_id, day_rate, work_status, work_date, daily_salary }).returning('id');
                res.json(data);
            } catch (error) {
                res.json("Invalide to add salary record: ", error);
            }
        })

        router.put("/punchout", async (req, res) => {
            //table: daily_attendance, salary
            let { id, out_time, day_working_hour, status } = req.body;
            let data = await this.knex('daily_attendance').where({ id }).first();
            if (data) {
                try {
                    let data = await this.knex('daily_attendance').where({ id }).update({ out_time, day_working_hour, status });
                    res.json(data);
                } catch (error) {
                    return res.status(404).json("Invalide to punch-out:", error);
                }
            } else {
                res.status(404).json("No id to punch out");
            }
        })

        router.get("/personal_info/:employee_id", async (req, res) => {
            let employee_id = req.params.employee_id;
            try {
                let data = await this.knex('personal_information').join('employee', 'employee.employee_id', 'personal_information.employee_id')
                    .select('*').where('personal_information.employee_id', `${employee_id}`).first();
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to show one:", error);
            }
        })

        router.get("/estatement/:employee_id", async (req, res) => {
            let employee_id = req.params.employee_id;
            try {
                let data = await this.knex('salary').select('employee_id', 'day_rate',
                    this.knex.raw("count(work_status) FILTER(WHERE work_status = 'FULL_DAY') as full_day"),
                    this.knex.raw("count(work_status) FILTER(WHERE work_status = 'HALF_DAY') as half_day"),
                    this.knex.raw('SUM(daily_salary) as total_salary'))
                    // .where('employee_id', `${employee_id}`, 'work_status', 'FULL_DAY')
                    .where({ employee_id })
                    .groupBy('employee_id', 'day_rate').first();
                res.json(data);
            } catch (error) {
                res.status(404).json("Invalide to get e-statement:", error);
            }
        })

        return router;
    }
}

module.exports = emAuthRouter;
