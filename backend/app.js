//import library
const express = require("express");
const app = express();
const path = require("path");
const passport = require('passport');
const bcrypt = require("bcrypt");
const session = require('express-session');
const comAuthRouter = require("./Router/adminRouter");
const emAuthRouter = require("./Router/employeeRouter")
const flash = require("express-flash");
const createClient = require('redis');
const jwt = require('jsonwebtoken');
const auth = require("./jwt-strategy");
const cors = require("cors");

const { engine } = require('express-handlebars');

const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

const port = 8001;

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
auth(knex).initialize();


//express-handlebar 
app.engine("handlebars", engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");
app.set("views", "./views");

//set up passport
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());


//set up node router
app.use("/admin", new comAuthRouter(express, passport, bcrypt, knex).router());
app.use("/employee", new emAuthRouter(express, passport, bcrypt, knex).router());

app.listen(port, () => {
    console.log(
        `
    logo site: http://localhost:${port}/logo
    root site: http://localhost:${port}`)
});