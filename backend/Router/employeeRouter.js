const jwt = require("jsonwebtoken");
class emAuthRouter {
    constructor(express, passport, bcrypt, knex) {
        this.express = express;
        this.passport = passport;
        this.bcrypt = bcrypt;
        this.knex = knex;
    }

    isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/employee_login");
    }

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }

    isEmployeeLogged(req, res, next) {
        if (req.isAuthenticated() && req.user.role == "employee") {
            return next();
        }
    }

    router() {
        let router = this.express.Router();

        router.post("/login", async (req, res) => {
            //handle email and password login
            const { username, password } = req.body;
            console.log("Backend username, password:", username, password);
            let user = await this.knex("users").where({ username }).first();
            if (user) {
                //check role first
                if (user.role != 'employee') {
                    res.status(401).json("Invalid username.");
                    return;
                }
                //check password
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
            } else {
                res.status(401).json("Invalid username.");
            }
        });

        router.get("/logout", this.isLogged, (req, res) => {
            req.logout(function (err) {
                if (err) {
                    return err;
                }
                res.redirect("/employee_login");
            });
        });

        return router;
    }
}

module.exports = emAuthRouter;
