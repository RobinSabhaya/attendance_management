const express = require("express");

const route = express.Router();
const employeeRoute = require("./employee/employee.route");
const adminRoute = require("./admin/admin.route");
const loginRoute = require("./login/login.route");

route.use("/employee", employeeRoute);
route.use("/login", loginRoute);
route.use("/admin", adminRoute);
module.exports = route;
