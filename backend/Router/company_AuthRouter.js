const jwt = require("jsonwebtoken");
class comAuthRouter {
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
        res.redirect("/admin_login");
    }

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }

    isAdminLogged(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === "company") {
                return next();
            }
            res.send("Only company admin is allowed to enter this page");
        }
        res.redirect("/admin_log");
    }

    router() {
        let router = this.express.Router();

        // router.post(
        //     "/company_signup",
        //     this.isNotLogged,
        //     this.passport.authenticate("company-signup", {
        //         successRedirect: "/admin/login",
        //         failureRedirect: "/company_signup",
        //         failureFlash: true,
        //     })
        // );

        router.post("/admin/login", async (req, res) => {
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

        router.get("/logout", this.isLogged, (req, res) => {
            req.logout(function (err) {
                if (err) {
                    return err;
                }
                res.redirect("/admin/login");
            });
        });

        return router;
    }
}

module.exports = comAuthRouter;
